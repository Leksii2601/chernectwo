export interface ProjectInitiative {
  id: string;
  icon: string;
  previewImage?: string;
  gallery?: string[];
  socialLinks?: {
    facebook?: string;
    website?: string;
    instagram?: string;
    phone?: string;
    whatsapp?: string;
    viber?: string;
    youtube?: string;
  };
  reports?: {
    year: string;
    file: string;
  }[];
}

export const projectsData: ProjectInitiative[] = [
  {
    id: "zhydychyn_center",
    socialLinks: {
      facebook: "https://www.facebook.com/ZhydychynCenter",
      website: "https://zhydychyn.center"
    },
    reports: [
      { year: "2025", file: "https://drive.google.com/file/d/1mLykIrM7dgX6T9CgrA6hPHdQMJUTqaMQ/view" },
      { year: "2024", file: "https://drive.google.com/file/d/1fKVtPdclosh6hURrN2C2Tv03mFgV-QoL/view" },
      { year: "2023", file: "https://drive.google.com/file/d/1GJ_gL7dInkFdLjPCpjAnp1-cINVHAN68/view" }
    ],
    icon: "/media/socialInitiatives/zhydychyn-center/logo.avif",
    previewImage: "/media/socialInitiatives/zhydychyn-center/preview.avif",
    gallery: [
      "/media/socialInitiatives/zhydychyn-center/zhydychyn-center_1.avif",
      "/media/socialInitiatives/zhydychyn-center/zhydychyn-center_2.avif",
      "/media/socialInitiatives/zhydychyn-center/zhydychyn-center_3.avif",
      "/media/socialInitiatives/zhydychyn-center/zhydychyn-center_4.avif",
      "/media/socialInitiatives/zhydychyn-center/zhydychyn-center_5.avif",
      "/media/socialInitiatives/zhydychyn-center/zhydychyn-center_6.avif",
      "/media/socialInitiatives/zhydychyn-center/zhydychyn-center_7.avif"
    ]
  },
  {
    id: "volunteer_movement",
    icon: "/media/socialInitiatives/volunteer-movement/logo.avif",
    previewImage: "/media/socialInitiatives/volunteer-movement/preview.avif",
    socialLinks: {
      facebook: "https://www.facebook.com/symoncyrenemovement"
    },
    reports: [
      { year: "2025", file: "https://drive.google.com/file/d/1mLrRmpMKxWKDZHLudILeGYslH31_2h4_/view" },
      { year: "2024", file: "https://drive.google.com/file/d/1bUT403kzNJ-fi6boBzVUG7Xv8xwwMUCK/view" }
    ],
    gallery: [
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_1.avif",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_2.avif",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_3.avif",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_4.avif",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_5.avif",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_6.avif",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_7.avif",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_8.avif",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_9.avif",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_10.avif",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_11.avif",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_12.avif"
    ]
  },
  {
    id: "resurrection_choir",
    icon: "/media/socialInitiatives/resurrection/logo.avif",
    socialLinks: {
      facebook: "https://www.facebook.com/zhydychyn.choir.voskresinnya"
    },
    previewImage: "/media/socialInitiatives/resurrection/preview.avif",
    gallery: [
      "/media/socialInitiatives/resurrection/resurrection_1.avif",
      "/media/socialInitiatives/resurrection/resurrection_2.avif",
      "/media/socialInitiatives/resurrection/resurrection_3.avif",
      "/media/socialInitiatives/resurrection/resurrection_4.avif",
      "/media/socialInitiatives/resurrection/resurrection_5.avif",
      "/media/socialInitiatives/resurrection/resurrection_6.avif",
      "/media/socialInitiatives/resurrection/resurrection_7.avif",
      "/media/socialInitiatives/resurrection/resurrection_8.avif",
      "/media/socialInitiatives/resurrection/resurrection_9.avif",
      "/media/socialInitiatives/resurrection/resurrection_10.avif",
      "/media/socialInitiatives/resurrection/resurrection_11.avif",
      "/media/socialInitiatives/resurrection/resurrection_12.avif",

    ]
  },
  {
    id: "zavtra",
    icon: "/media/socialInitiatives/zavtra/logo.avif",
    socialLinks: {
      facebook: "https://www.facebook.com/info.zavtra"
    },
    previewImage: "/media/socialInitiatives/zavtra/preview.avif",
    gallery: [
      "/media/socialInitiatives/zavtra/zavtra_1.avif",
      "/media/socialInitiatives/zavtra/zavtra_2.avif",
      "/media/socialInitiatives/zavtra/zavtra_3.avif",
      "/media/socialInitiatives/zavtra/zavtra_4.avif",
      "/media/socialInitiatives/zavtra/zavtra_5.avif",
      "/media/socialInitiatives/zavtra/zavtra_6.avif",
      "/media/socialInitiatives/zavtra/zavtra_7.avif",
      "/media/socialInitiatives/zavtra/zavtra_8.avif",
      "/media/socialInitiatives/zavtra/zavtra_9.avif",
      "/media/socialInitiatives/zavtra/zavtra_10.avif",
      "/media/socialInitiatives/zavtra/zavtra_11.avif",
      "/media/socialInitiatives/zavtra/zavtra_12.avif",
    ]
  },
  {
    id: "sunday_school",
    icon: "/media/socialInitiatives/sunday-school/logo.avif",
    socialLinks: {
      facebook: "https://www.facebook.com/sunday-school.monastery"
    },
    previewImage: "/media/socialInitiatives/sunday-school/preview.avif",
    gallery: [
      "/media/socialInitiatives/sunday-school/sunday-school_1.avif",
      "/media/socialInitiatives/sunday-school/sunday-school_2.avif",
      "/media/socialInitiatives/sunday-school/sunday-school_3.avif",
      "/media/socialInitiatives/sunday-school/sunday-school_4.avif",
      "/media/socialInitiatives/sunday-school/sunday-school_5.avif",
      "/media/socialInitiatives/sunday-school/sunday-school_6.avif",
      "/media/socialInitiatives/sunday-school/sunday-school_7.avif",
      "/media/socialInitiatives/sunday-school/sunday-school_8.avif",
      "/media/socialInitiatives/sunday-school/sunday-school_9.avif"
    ]
  },
  {
    id: "palamar",
    icon: "/media/socialInitiatives/palamar/logo.avif",
    socialLinks: {
      facebook: "https://www.facebook.com/zhydychyn.palamar.ua/"
    },
    reports: [
      { year: "2025", file: "https://drive.google.com/file/d/1gP5cLmV5-UiQyvunCKfwST2t4_VvZlEF/view" },
      { year: "2024", file: "https://drive.google.com/file/d/1L4LjlECJwBCjpvamH1ZSdZBn3L0gERIY/view" }
    ],
    previewImage: "/media/socialInitiatives/palamar/preview.avif",
    gallery: [
      "/media/socialInitiatives/palamar/palamar_1.avif",
      "/media/socialInitiatives/palamar/palamar_2.avif",
      "/media/socialInitiatives/palamar/palamar_3.avif",
      "/media/socialInitiatives/palamar/palamar_4.avif",
      "/media/socialInitiatives/palamar/palamar_5.avif",
      "/media/socialInitiatives/palamar/palamar_6.avif",
      "/media/socialInitiatives/palamar/palamar_7.avif",
      "/media/socialInitiatives/palamar/palamar_8.avif",
      "/media/socialInitiatives/palamar/palamar_9.avif",
      "/media/socialInitiatives/palamar/palamar_10.avif",
      "/media/socialInitiatives/palamar/palamar_11.avif",
      "/media/socialInitiatives/palamar/palamar_12.avif",
      "/media/socialInitiatives/palamar/palamar_13.avif"

    ]
  },
  {
    id: "fire_brigade",
    icon: "/media/socialInitiatives/fire-brigade/logo.avif",
    socialLinks: {
      facebook: "https://www.facebook.com/vnutrishnyabezpeka"
    },
    reports: [
      { year: "2025", file: "https://drive.google.com/file/d/16pnrvxDSng0KNyHxHT9Rlw8PlBl-Ut4h/view" },
      { year: "2024", file: "https://drive.google.com/file/d/1k0eGqCC0kyDSqTxnIHyP2BgPhSCRoyu1/view" }
    ],
    previewImage: "/media/socialInitiatives/fire-brigade/preview.avif",
    gallery: [
      "/media/socialInitiatives/fire-brigade/fire-brigade_1.avif",
      "/media/socialInitiatives/fire-brigade/fire-brigade_2.avif",
      "/media/socialInitiatives/fire-brigade/fire-brigade_3.avif",
      "/media/socialInitiatives/fire-brigade/fire-brigade_4.avif",
      "/media/socialInitiatives/fire-brigade/fire-brigade_5.avif",
      "/media/socialInitiatives/fire-brigade/fire-brigade_6.avif",
      "/media/socialInitiatives/fire-brigade/fire-brigade_7.avif",
      "/media/socialInitiatives/fire-brigade/fire-brigade_8.avif",
      "/media/socialInitiatives/fire-brigade/fire-brigade_9.avif",
      "/media/socialInitiatives/fire-brigade/fire-brigade_10.avif",
      "/media/socialInitiatives/fire-brigade/fire-brigade_11.avif",
      "/media/socialInitiatives/fire-brigade/fire-brigade_12.avif",
      "/media/socialInitiatives/fire-brigade/fire-brigade_13.avif",
    ]
  },
  {
    id: "archimandrite_gardens",
    icon: "/media/socialInitiatives/archimandrite-gardens/logo.avif",
    socialLinks: {
      facebook: "https://www.facebook.com/archimandrite.gardens"
    },
    previewImage: "/media/socialInitiatives/archimandrite-gardens/preview.avif",
    gallery: [
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_1.avif",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_2.avif",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_3.avif",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_4.avif",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_5.avif",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_6.avif",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_7.avif",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_8.avif",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_9.avif",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_10.avif",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_11.avif",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_12.avif"
    ]
  },
  {
    id: "history_arena",
    icon: "/media/socialInitiatives/history-arena/logo.avif",
    socialLinks: {
      facebook: "https://www.facebook.com/zhydychyn.history.hall"
    },
    previewImage: "/media/socialInitiatives/history-arena/preview.avif",
    gallery: [
      "/media/socialInitiatives/history-arena/history-arena_1.avif",
      "/media/socialInitiatives/history-arena/history-arena_2.avif",
      "/media/socialInitiatives/history-arena/history-arena_3.avif",
      "/media/socialInitiatives/history-arena/history-arena_4.avif",
      "/media/socialInitiatives/history-arena/history-arena_5.avif",
      "/media/socialInitiatives/history-arena/history-arena_6.avif",
      "/media/socialInitiatives/history-arena/history-arena_7.avif",
      "/media/socialInitiatives/history-arena/history-arena_8.avif",
      "/media/socialInitiatives/history-arena/history-arena_9.avif"
    ]
  },
  {
    id: "chaplain_service",
    icon: "/media/socialInitiatives/chaplain-service/logo.avif",
    socialLinks: {
      facebook: "https://www.facebook.com/kapelanskeslyzhinya"
    },
    previewImage: "/media/socialInitiatives/chaplain-service/preview.avif",
    gallery: [
      "/media/socialInitiatives/chaplain-service/chaplain-service_1.avif",
      "/media/socialInitiatives/chaplain-service/chaplain-service_2.avif",
      "/media/socialInitiatives/chaplain-service/chaplain-service_3.avif",
      "/media/socialInitiatives/chaplain-service/chaplain-service_4.avif",
      "/media/socialInitiatives/chaplain-service/chaplain-service_5.avif",
      "/media/socialInitiatives/chaplain-service/chaplain-service_6.avif",
      "/media/socialInitiatives/chaplain-service/chaplain-service_7.avif"
    ]
  },
  {
    id: "reading_room",
    icon: "/media/socialInitiatives/reading-room/logo.avif",
    previewImage: "/media/socialInitiatives/reading-room/preview.avif",
    gallery: [
      "/media/socialInitiatives/reading-room/reading-room_1.avif",
      "/media/socialInitiatives/reading-room/reading-room_2.avif",
      "/media/socialInitiatives/reading-room/reading-room_3.avif",
      "/media/socialInitiatives/reading-room/reading-room_4.avif",
      "/media/socialInitiatives/reading-room/reading-room_5.avif",
      "/media/socialInitiatives/reading-room/reading-room_6.avif",
      "/media/socialInitiatives/reading-room/reading-room_7.avif",
      "/media/socialInitiatives/reading-room/reading-room_8.avif",
      "/media/socialInitiatives/reading-room/reading-room_9.avif",
      "/media/socialInitiatives/reading-room/reading-room_10.avif",
      "/media/socialInitiatives/reading-room/reading-room_11.avif"
    ]
  },
  {
    id: "myrt",
    icon: "/media/socialInitiatives/myrt/logo.avif",
    previewImage: "/media/socialInitiatives/myrt/preview.avif",
    gallery: [
      "/media/socialInitiatives/myrt/myrt_1.avif",
      "/media/socialInitiatives/myrt/myrt_2.avif",
      "/media/socialInitiatives/myrt/myrt_3.avif",
      "/media/socialInitiatives/myrt/myrt_4.avif",
      "/media/socialInitiatives/myrt/myrt_5.avif",
      "/media/socialInitiatives/myrt/myrt_6.avif",
      "/media/socialInitiatives/myrt/myrt_7.avif",
      "/media/socialInitiatives/myrt/myrt_8.avif",
      "/media/socialInitiatives/myrt/myrt_9.avif",
    ]
  }
];

export function getProjectsData() {
  return projectsData;
}
