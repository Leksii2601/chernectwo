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
  };
}

export const projectsData: ProjectInitiative[] = [
  {
    id: "zhydychyn_center",
    socialLinks: {
      facebook: "https://www.facebook.com/ZhydychynCenter",
      website: "https://zhydychyn.center"
    },
    icon: "/media/socialInitiatives/zhydychyn-center/logo.png",
    previewImage: "/media/socialInitiatives/zhydychyn-center/preview.jpg",
    gallery: [
      "/media/socialInitiatives/zhydychyn-center/zhydychyn-center_1.png",
      "/media/socialInitiatives/zhydychyn-center/zhydychyn-center_2.png",
      "/media/socialInitiatives/zhydychyn-center/zhydychyn-center_3.jpg",
      "/media/socialInitiatives/zhydychyn-center/zhydychyn-center_4.jpg",
      "/media/socialInitiatives/zhydychyn-center/zhydychyn-center_5.jpg"
    ]
  },
  {
    id: "volunteer_movement",
    icon: "/media/socialInitiatives/volunteer-movement/logo.png",
    previewImage: "/media/socialInitiatives/volunteer-movement/preview.jpg",
    socialLinks: {
      facebook: "https://www.facebook.com/symoncyrenemovement"
    },
    gallery: [
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_1.jpg",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_2.jpg",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_3.jpg",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_4.jpg",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_5.jpg",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_6.jpg",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_7.jpg",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_8.jpg",
      "/media/socialInitiatives/volunteer-movement/volunteer-movement_9.jpg"
    ]
  },
  {
    id: "resurrection_choir",
    icon: "/media/socialInitiatives/resurrection/logo.png",
    socialLinks: {
      facebook: "https://www.facebook.com/resurrectionchoir"
    },
    previewImage: "/media/socialInitiatives/resurrection/preview.jpg",
    gallery: [
      "/media/socialInitiatives/resurrection/resurrection_1.jpg",
      "/media/socialInitiatives/resurrection/resurrection_2.jpg",
      "/media/socialInitiatives/resurrection/resurrection_3.jpg",
      "/media/socialInitiatives/resurrection/resurrection_4.jpg",
      "/media/socialInitiatives/resurrection/resurrection_5.jpg",
      "/media/socialInitiatives/resurrection/resurrection_6.jpg",
      "/media/socialInitiatives/resurrection/resurrection_7.jpg"
    ]
  },
  {
    id: "zavtra",
    icon: "/media/socialInitiatives/zavtra/logo.png",
    socialLinks: {
      facebook: "https://www.facebook.com/zavtra.monastery"
    },
    previewImage: "/media/socialInitiatives/zavtra/preview.jpg",
    gallery: [
      "/media/socialInitiatives/zavtra/zavtra_1.jpg",
      "/media/socialInitiatives/zavtra/zavtra_2.jpg",
      "/media/socialInitiatives/zavtra/zavtra_3.jpg",
      "/media/socialInitiatives/zavtra/zavtra_4.jpg",
      "/media/socialInitiatives/zavtra/zavtra_5.jpg",
      "/media/socialInitiatives/zavtra/zavtra_6.jpg",
      "/media/socialInitiatives/zavtra/zavtra_7.jpg",
      "/media/socialInitiatives/zavtra/zavtra_8.jpg",
      "/media/socialInitiatives/zavtra/zavtra_9.jpg"
    ]
  },
  {
    id: "sunday_school",
    icon: "/media/socialInitiatives/sunday-school/logo.png",
    socialLinks: {
      facebook: "https://www.facebook.com/sunday-school.monastery"
    },
    previewImage: "/media/socialInitiatives/sunday-school/preview.jpg",
    gallery: [
      "/media/socialInitiatives/sunday-school/sunday-school_1.jpg",
      "/media/socialInitiatives/sunday-school/sunday-school_2.jpg",
      "/media/socialInitiatives/sunday-school/sunday-school_3.jpg",
      "/media/socialInitiatives/sunday-school/sunday-school_4.jpg",
      "/media/socialInitiatives/sunday-school/sunday-school_5.jpg",
      "/media/socialInitiatives/sunday-school/sunday-school_6.jpg",
      "/media/socialInitiatives/sunday-school/sunday-school_7.jpg"
    ]
  },
  {
    id: "palamar",
    icon: "/media/socialInitiatives/palamar/logo.png",
    socialLinks: {
      facebook: "https://www.facebook.com/zhydychyn.palamar.ua/"
    },
    previewImage: "/media/socialInitiatives/palamar/preview.jpg",
    gallery: [
      "/media/socialInitiatives/palamar/palamar_1.jpg",
      "/media/socialInitiatives/palamar/palamar_2.jpg",
      "/media/socialInitiatives/palamar/palamar_3.jpg",
      "/media/socialInitiatives/palamar/palamar_4.jpg",
      "/media/socialInitiatives/palamar/palamar_5.jpg",
      "/media/socialInitiatives/palamar/palamar_6.jpg"
    ]
  },
  {
    id: "fire_brigade",
    icon: "/media/socialInitiatives/fire-brigade/logo.png",
    socialLinks: {
      facebook: "https://www.facebook.com/fire-brigade.monastery"
    },
    previewImage: "/media/socialInitiatives/fire-brigade/preview.jpg",
    gallery: [
      "/media/socialInitiatives/fire-brigade/fire-brigade_1.jpg",
      "/media/socialInitiatives/fire-brigade/fire-brigade_2.jpg",
      "/media/socialInitiatives/fire-brigade/fire-brigade_3.jpg",
      "/media/socialInitiatives/fire-brigade/fire-brigade_4.jpg",
      "/media/socialInitiatives/fire-brigade/fire-brigade_5.jpg",
      "/media/socialInitiatives/fire-brigade/fire-brigade_6.jpg"
    ]
  },
  {
    id: "archimandrite_gardens",
    icon: "/media/socialInitiatives/archimandrite-gardens/logo.png",
    socialLinks: {
      facebook: "https://www.facebook.com/archimandrite-gardens.monastery"
    },
    previewImage: "/media/socialInitiatives/archimandrite-gardens/preview.jpg",
    gallery: [
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_1.jpg",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_2.jpg",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_3.jpg",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_4.jpg",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_5.jpg",
      "/media/socialInitiatives/archimandrite-gardens/archimandrite-gardens_6.jpg"
    ]
  },
  {
    id: "history_arena",
    icon: "/media/socialInitiatives/history-arena/logo.png",
    socialLinks: {
      facebook: "https://www.facebook.com/history-arena.monastery"
    },
    previewImage: "/media/socialInitiatives/history-arena/preview.jpg",
    gallery: [
      "/media/socialInitiatives/history-arena/history-arena_1.jpg",
      "/media/socialInitiatives/history-arena/history-arena_2.jpg",
      "/media/socialInitiatives/history-arena/history-arena_3.jpg",
      "/media/socialInitiatives/history-arena/history-arena_4.jpg",
      "/media/socialInitiatives/history-arena/history-arena_5.jpg",
      "/media/socialInitiatives/history-arena/history-arena_6.jpg"
    ]
  },
  {
    id: "chaplain_service",
    icon: "/media/socialInitiatives/chaplain-service/logo.png",
    socialLinks: {
      facebook: "https://www.facebook.com/chaplain-service.monastery"
    },
    previewImage: "/media/socialInitiatives/chaplain-service/preview.jpg",
    gallery: [
      "/media/socialInitiatives/chaplain-service/chaplain-service_1.jpg",
      "/media/socialInitiatives/chaplain-service/chaplain-service_2.jpg",
      "/media/socialInitiatives/chaplain-service/chaplain-service_3.jpg",
      "/media/socialInitiatives/chaplain-service/chaplain-service_4.jpg",
      "/media/socialInitiatives/chaplain-service/chaplain-service_5.jpg",
      "/media/socialInitiatives/chaplain-service/chaplain-service_6.jpg"
    ]
  },
  {
    id: "reading_room",
    icon: "/media/socialInitiatives/reading-room/logo.png",
    socialLinks: {
      facebook: "https://www.facebook.com/reading-room.monastery"
    },
    previewImage: "/media/socialInitiatives/reading-room/preview.jpg",
    gallery: [
      "/media/socialInitiatives/reading-room/reading-room_1.jpg",
      "/media/socialInitiatives/reading-room/reading-room_2.jpg",
      "/media/socialInitiatives/reading-room/reading-room_3.jpg",
      "/media/socialInitiatives/reading-room/reading-room_4.jpg",
      "/media/socialInitiatives/reading-room/reading-room_5.jpg",
      "/media/socialInitiatives/reading-room/reading-room_6.jpg"
    ]
  },
  {
    id: "myrt",
    icon: "/media/socialInitiatives/myrt/logo.png",
    socialLinks: {
      facebook: "https://www.facebook.com/myrt.monastery"
    },
    previewImage: "/media/socialInitiatives/myrt/preview.jpg",
    gallery: [
      "/media/socialInitiatives/myrt/myrt_1.jpg",
      "/media/socialInitiatives/myrt/myrt_2.jpg",
      "/media/socialInitiatives/myrt/myrt_3.jpg",
      "/media/socialInitiatives/myrt/myrt_4.jpg",
      "/media/socialInitiatives/myrt/myrt_5.jpg",
      "/media/socialInitiatives/myrt/myrt_6.jpg"
    ]
  }
];

export function getProjectsData() {
  return projectsData;
}
