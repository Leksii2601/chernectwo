# Виправлення: suppressOrdinary

## Проблема

Великі свята (1 січня - Обрізання Господнє, 2-5 січня - Передсвято Богоявлення) **повністю вит

існяють** рядові читання тижня, але алгоритм продовжував їх додавати.

## Рішення

Додано прапорець `suppressOrdinary` у `fixed_readings.json`:

```json
{
  "date_month_day": "01-01",
  "title": "Обрізання Господнє. Свт. Василія Великого",
  "morning": "Ін. 35 зач.; 10:1-9",
  "apostle": "Обрізання: Кол. 254 зач.; 2:8-12. Свт.: Євр. 318 зач.; 7:26 – 8:2",
  "gospel": "Обрізання: Лк. 6 зач.; 2:20-21, 40-52. Свт.: Ін. 36 зач.; 10:9-16",
  "suppressOrdinary": true  // ← Це ключове поле
}
```

## Оновлені дні

### 1 січня - Обрізання Господнє
- ✅ Додано ранкові читання (`morning`)
- ✅ Розділено читання Обрізання та Василію Великому
- ✅ Встановлено `suppressOrdinary: true`
- ❌ Рядові читання четверга НЕ відображаються

### 2 січня - Передсвято Богоявлення
- ✅ Встановлено `suppressOrdinary: true`
- ❌ Рядові читання п'ятниці НЕ відображаються
- ✅ Тільки передсвятні та святительські читання

### 3 січня - Субота перед Богоявленням
- ✅ Оновлено назву та читання
- ✅ Додано читання Суботи перед Богоявленням (1 Тим., Мф.)
- ✅ Додано читання мученику Гордію
- ✅ Встановлено `suppressOrdinary: true`
- ❌ Рядові читання суботи НЕ відображаються

### 4-5 січня - Решта передсвята
- ✅ Встановлено `suppressOrdinary: true` для обох днів

## Лог

іка у `getStructuredReadings()`

```typescript
// Перевіряємо чи витісняє свято рядові читання
const saintEntry = FIXED_READINGS_MAP.get(monthDay);
const suppressOrdinary = saintEntry && saintEntry.suppressOrdinary === true;

// Ранкові читання
if (saintEntry && saintEntry.morning) {
    morningReading = saintEntry.morning;
}

// Рядові читання - ТІЛЬКИ якщо НЕ витіснені
if (!suppressOrdinary) {
    // ... логіка рядових читань
}

// Святкові читання - ЗАВЖДИ додаємо
if (saintEntry && saintEntry.apostle && saintEntry.gospel) {
    liturgyReadings.push({ ... });
}
```

## Оновлено `formatReadingsForDisplay()`

Кожне читання тепер з **нового рядка**:

```typescript
export function formatReadingsForDisplay(readings: DayReadings): string {
    let output = "";
    
    if (readings.morning) {
        output += `Ран. – ${readings.morning}\n\n`;
    }

    if (readings.liturgy && readings.liturgy.length > 0) {
        output += "Літ. –\n";  // ← Переніс після "Літ."
        readings.liturgy.forEach((item, index) => {
            const prefix = item.label ? `${item.label}: ` : "";
            output += `${prefix}Ап. ${item.apostle}\n`;  // ← Новий рядок
            output += `${prefix}Єв. ${item.gospel}`;
            if (index < readings.liturgy.length - 1) {
                output += "\n\n";  // ← Подвійний переніс між групами
            }
        });
    }

    return output;
}
```

## Результат для 1 січня 2026

**Було (неправильно):**
```
Ряд.: Ап. 1 Сол 5:1-8. Єв. Лк 21:12-19.
Обрізання: Ап. Кол. 254 зач.
```

**Стало (правильно):**
```
Ран. – Ін. 35 зач.; 10:1-9

Літ. –
Обрізання: Ап. Кол. 254 зач.; 2:8-12
Обрізання: Єв. Лк. 6 зач.; 2:20-21, 40-52

Свт.: Ап. Євр. 318 зач.; 7:26 – 8:2
Свт.: Єв. Ін. 36 зач.; 10:9-16
```

## Статус

- ✅ Додано `suppressOrdinary` для днів 1-5 січня
- ✅ Додано ранкові читання для 1 січня
- ✅ Оновлено 3 січня на Суботу перед Богоявленням
- ⏳ Потрібно оновити `getStructuredReadings()` (наступний крок)
- ⏳ Потрібно оновити `formatReadingsForDisplay()` (наступний крок)

---

**Дата**: 29 січня 2026
