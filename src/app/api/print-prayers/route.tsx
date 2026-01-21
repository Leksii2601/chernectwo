import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import React from 'react'
import { renderToStream, Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer'
import path from 'path'
import fs from 'fs'

// Register a font that supports Cyrillic - using local font
Font.register({
  family: 'Cuprum',
  src: path.join(process.cwd(), 'public', 'fonts', 'Cuprum-Regular.ttf'),
})

Font.register({
    family: 'CuprumBold',
    src: path.join(process.cwd(), 'public', 'fonts', 'Cuprum-Bold.ttf'),
  })

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: 'Cuprum', 
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteContainer: {
    width: '18%', // 5 columns (~ 20% each minus gap)
    height: 570, 
    padding: 5,
    position: 'relative',
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: 2,
    marginTop: 5,
    height: 35, // Fixed height for header area
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'CuprumBold',
    marginBottom: 5
  },
  namesList: {
    marginTop: 5,
  },
  lineRow: {
    marginBottom: 21, 
    borderBottomWidth: 1,
    height: 22, 
    justifyContent: 'flex-end'
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
    marginBottom: 2
  },
  footer: {
      position: 'absolute',
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 8,
      fontFamily: 'CuprumBold',
      height: 60, // Fixed height for footer area
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  logoImage: {
      width: '90%',
      height: 'auto',
      marginBottom: 5
  },
  footerImage: {
      width: '90%',
      height: 'auto',
      marginBottom: 5
  }
})

const PrayerSheet = ({ notes }: { notes: any[] }) => {
    let headerImage: Buffer | undefined, footerImage: Buffer | undefined;
    let headerModifiedImage: Buffer | undefined, footerModifiedImage: Buffer | undefined;

    try {
        const headerPath = path.join(process.cwd(), 'public', 'media', 'header.png');
        const footerPath = path.join(process.cwd(), 'public', 'media', 'footer.png');
        const headerModifiedPath = path.join(process.cwd(), 'public', 'media', 'header-modified.png');
        const footerModifiedPath = path.join(process.cwd(), 'public', 'media', 'footer-modified.png');
        
        headerImage = fs.readFileSync(headerPath);
        footerImage = fs.readFileSync(footerPath);
        headerModifiedImage = fs.readFileSync(headerModifiedPath);
        footerModifiedImage = fs.readFileSync(footerModifiedPath);
    } catch (e) {
        console.error("Error loading print images:", e);
    }

    return (
    <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
        {notes.map((note, idx) => {
             const names = note.names || [];
             const renderNames = [...names];
             while(renderNames.length < 10) {
                 renderNames.push({ name: '' });
             }

             const isRepose = note.type === 'repose';
             const themeColor = isRepose ? '#000000' : '#D22626';
             const currentHeader = isRepose ? headerModifiedImage : headerImage;
             const currentFooter = isRepose ? footerModifiedImage : footerImage;

             return (
            <View key={idx} style={styles.noteContainer} wrap={false}>
                <View style={styles.header}>
                     {currentHeader && <Image src={currentHeader} style={styles.logoImage} />}
                </View>
                
                <Text style={[styles.title, { color: themeColor }]}>
                    {note.type === 'health' ? "ЗА ЗДОРОВ'Я" : "ЗА УПОКІЙ"}
                </Text>
                
                <View style={styles.namesList}>
                    {renderNames.slice(0, 10).map((n: any, i: number) => (
                        <View key={i} style={[styles.lineRow, { borderBottomColor: themeColor }]}>
                           <Text style={styles.name}>{n.name}</Text>
                        </View>
                    ))}
                </View>

                 <View style={styles.footer}>
                     {currentFooter && <Image src={currentFooter} style={styles.footerImage} />}
                     <Text style={{ color: themeColor }}>Свято-Миколаївський</Text>
                     <Text style={{ color: themeColor }}>Жидичинський монастир</Text>
                 </View>
            </View>
        )})}
        </Page>
    </Document>
    )
}

export async function GET() {
  const payload = await getPayload({ config: configPromise })

  try {
    // 1. Fetch Oldest Unprocessed Requests
    const result = await payload.find({
        collection: 'prayer-requests',
        limit: 5, 
        sort: 'createdAt',
    })

    if (result.docs.length === 0) {
       // Return HTML that closes itself or shows message
       return new NextResponse('<h1>No new prayer requests found</h1>', { headers: { 'Content-Type': 'text/html' }});
    }

    // 2. Generate PDF stream
    const stream = await renderToStream(<PrayerSheet notes={result.docs} />);
    
    // 3. Delete processed
    for (const doc of result.docs) {
        await payload.delete({
            collection: 'prayer-requests',
            id: doc.id
        })
    }

    // 4. Return as stream
    return new NextResponse(stream as any, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="prayer-sheet-${new Date().toISOString().split('T')[0]}.pdf"`,
        }
    });

  } catch (err: any) {
      console.error('PDF Generation Error:', err);
      return NextResponse.json({ error: 'Failed to generate PDF', details: err.message, stack: err.stack }, { status: 500 });
  }
}
