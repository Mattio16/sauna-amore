export interface Product {
  id: string;
  nameIt: string;
  nameEn: string;
  name?: string;
  description?: string;
  persons?: number;
  capacity?: number;
  dims?: string;
  dimensions?: {
    width?: number;
    depth?: number;
    height?: number;
  };
  category?: string;
  price?: number;
  flatpack?: number;
  assembled?: number;
  assembledPrice?: number;
  image?: string;
  images?: string[];
  subtitleIt?: string;
  subtitleEn?: string;
  type?: string;
  compatibleHeaters?: string[];
  compatibleAccessories?: string[];
}

export interface Heater {
  id: string;
  nameIt: string;
  nameEn: string;
  type?: string;
  price: number;
}

export interface Accessory {
  id: string;
  nameIt: string;
  nameEn: string;
  price: number;
  image?: string;
  category: string;
  descIt?: string;
  descEn?: string;
  specsIt?: string;
  specsEn?: string;
}

export const saunas: Product[] = [
  {
        assembled: 2879,
        category: '2m',
        dims: '160×200×210cm',
        flatpack: 2619,
        id: 'S16E',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s16/foto-1-1.6m-fasssauna-mini-fur-3-pers.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s16/foto-1-1.6m-fasssauna-mini-fur-3-pers.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s16/foto-2-1.6m-fasssauna-mini-fur-3-pers.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s16/S16-3.jpg&x=600&y=400&a=true'],
        nameEn: 'S16E 1.6m Spruce',
        nameIt: 'S16E 1.6m Spruce',
        persons: 3
      },
  {
        assembled: 3489,
        category: '2m',
        dims: '160×200×210cm',
        flatpack: 3229,
        id: 'S16T',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s16/foto-2-1.6m-fasssauna-mini-fur-3-pers.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s16/foto-1-1.6m-fasssauna-mini-fur-3-pers.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s16/foto-2-1.6m-fasssauna-mini-fur-3-pers.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s16/S16-3.jpg&x=600&y=400&a=true'],
        nameEn: 'S16T 1.6m Thermowood',
        nameIt: 'S16T 1.6m Thermowood',
        persons: 3
      },
  {
        assembled: 3209,
        category: '2m',
        dims: '200×200×210cm',
        flatpack: 2839,
        id: 'S2E',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/sauna-s2-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/sauna-s2-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/sauna-s2-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/foto-1-2m-fasssauna-fur-4-pers.jpg&x=600&y=400&a=true'],
        nameEn: 'S2E 2m Spruce',
        nameIt: 'S2E 2m Spruce',
        persons: 4
      },
  {
        assembled: 4039,
        category: '2m',
        dims: '200×200×210cm',
        flatpack: 3669,
        id: 'S2T',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/sauna-s2-2.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/sauna-s2-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/sauna-s2-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/foto-1-2m-fasssauna-fur-4-pers.jpg&x=600&y=400&a=true'],
        nameEn: 'S2T 2m Thermowood',
        nameIt: 'S2T 2m Thermowood',
        persons: 4
      },
  {
        assembled: 3349,
        category: '2m',
        dims: '240×200×210cm',
        flatpack: 2979,
        id: 'S2VE',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/foto-1-2-4m-fasssauna-fur-4-pers-mit-sitzen-aussen.jpg&x=600&y=400&a=true'],
        nameEn: 'S2VE 2.4m Spruce',
        nameIt: 'S2VE 2.4m Spruce',
        persons: 4
      },
  {
        assembled: 4219,
        category: '2m',
        dims: '240×200×210cm',
        flatpack: 3849,
        id: 'S2VT',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-2.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/foto-1-2-4m-fasssauna-fur-4-pers-mit-sitzen-aussen.jpg&x=600&y=400&a=true'],
        nameEn: 'S2VT 2.4m Thermowood',
        nameIt: 'S2VT 2.4m Thermowood',
        persons: 4
      },
  {
        assembled: 3919,
        category: '2m',
        dims: '280×200×210cm',
        flatpack: 3449,
        id: 'S28VE',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-3.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-2.jpg&x=600&y=400&a=true'],
        nameEn: 'S28VE 2.8m Spruce',
        nameIt: 'S28VE 2.8m Spruce',
        persons: 6
      },
  {
        assembled: 4829,
        category: '2m',
        dims: '280×200×210cm',
        flatpack: 4359,
        id: 'S28VT',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-3.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2V/sauna-s2v-2.jpg&x=600&y=400&a=true'],
        nameEn: 'S28VT 2.8m Thermowood',
        nameIt: 'S28VT 2.8m Thermowood',
        persons: 6
      },
  {
        assembled: 3999,
        category: '2m',
        dims: '300×200×210cm',
        flatpack: 3529,
        id: 'S3E',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/sauna-s3-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/sauna-s3-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/sauna-s3-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/foto-1-3m-fasssauna-fur-6-pers.jpg&x=600&y=400&a=true'],
        nameEn: 'S3E 3m Spruce',
        nameIt: 'S3E 3m Spruce',
        persons: 6
      },
  {
        assembled: 4999,
        category: '2m',
        dims: '300×200×210cm',
        flatpack: 4459,
        id: 'S3T',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/sauna-s3-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/sauna-s3-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/sauna-s3-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/foto-1-3m-fasssauna-fur-6-pers.jpg&x=600&y=400&a=true'],
        nameEn: 'S3T 3m Thermowood',
        nameIt: 'S3T 3m Thermowood',
        persons: 6
      },
  {
        assembled: 4509,
        category: '2m',
        dims: '300×200×210cm',
        flatpack: 3979,
        id: 'S3PE',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/foto-1-3m-fasssauna-fur-4-pers-mit-vorraum.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/foto-1-3m-fasssauna-fur-4-pers-mit-vorraum.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/sauna-s3-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/sauna-s3-2.jpg&x=600&y=400&a=true'],
        nameEn: 'S3PE 3m+vestibule Spruce',
        nameIt: 'S3PE 3m+vestibolo Spruce',
        persons: 4
      },
  {
        assembled: 5519,
        category: '2m',
        dims: '300×200×210cm',
        flatpack: 4999,
        id: 'S3PT',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/foto-1-3m-fasssauna-fur-4-pers-mit-vorraum.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/foto-1-3m-fasssauna-fur-4-pers-mit-vorraum.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/sauna-s3-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S3-S3P/sauna-s3-2.jpg&x=600&y=400&a=true'],
        nameEn: 'S3PT 3m+vestibule Thermo',
        nameIt: 'S3PT 3m+vestibolo Thermo',
        persons: 4
      },
  {
        assembled: 5219,
        category: '2m',
        dims: '400×200×210cm',
        flatpack: 4529,
        id: 'S4PE',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4P/sauna-s4p-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4P/sauna-s4p-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4P/sauna-s4p-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4P/foto-1-4m-fasssauna-fur-8-pers-mit-vorraum.jpg&x=600&y=400&a=true'],
        nameEn: 'S4PE 4m Spruce',
        nameIt: 'S4PE 4m Spruce',
        persons: 4
      },
  {
        assembled: 6379,
        category: '2m',
        dims: '400×200×210cm',
        flatpack: 5689,
        id: 'S4PT',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4P/sauna-s4p-2.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4P/sauna-s4p-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4P/sauna-s4p-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4P/foto-1-4m-fasssauna-fur-8-pers-mit-vorraum.jpg&x=600&y=400&a=true'],
        nameEn: 'S4PT 4m Thermowood',
        nameIt: 'S4PT 4m Thermowood',
        persons: 4
      },
  {
        assembled: 3379,
        category: '2.2m',
        dims: '200×220×230cm',
        flatpack: 3119,
        id: 'S22E',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/sauna-s2-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/sauna-s2-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/sauna-s2-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/foto-1-2m-fasssauna-fur-4-pers.jpg&x=600&y=400&a=true'],
        nameEn: 'S22E 2m Spruce Ø2.2',
        nameIt: 'S22E 2m Spruce Ø2.2',
        persons: 4
      },
  {
        assembled: 4439,
        category: '2.2m',
        dims: '200×220×230cm',
        flatpack: 4069,
        id: 'S22T',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/sauna-s2-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/sauna-s2-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/sauna-s2-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S2/foto-1-2m-fasssauna-fur-4-pers.jpg&x=600&y=400&a=true'],
        nameEn: 'S22T 2m Thermo Ø2.2',
        nameIt: 'S22T 2m Thermo Ø2.2',
        persons: 4
      },
  {
        assembled: 3879,
        category: 'cube',
        dims: '2x2m',
        flatpack: 3409,
        id: 'SQR2E',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s17/round-cube-sauna-s17-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s17/round-cube-sauna-s17-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s17/round-cube-sauna-s17-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s17/round-cube-sauna-s17-9.jpg&x=600&y=400&a=true'],
        nameEn: 'SQR2E 2m Spruce',
        nameIt: 'SQR2E 2m Spruce',
        persons: 4
      },
  {
        assembled: 4829,
        category: 'cube',
        dims: '2x2m',
        flatpack: 4359,
        id: 'SQR2T',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s17/round-cube-sauna-s17-2.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s17/round-cube-sauna-s17-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s17/round-cube-sauna-s17-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-s17/round-cube-sauna-s17-9.jpg&x=600&y=400&a=true'],
        nameEn: 'SQR2T 2m Thermo',
        nameIt: 'SQR2T 2m Thermo',
        persons: 4
      },
  {
        assembled: 8919,
        category: 'premium',
        dims: '500×220×230cm',
        flatpack: 7699,
        id: 'S5PLE',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S5P/sauna-s5p-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S5P/sauna-s5p-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S5P/sauna-s5p-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S5P/sauna-s5p-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S5P/sauna-s5p-4.jpg&x=600&y=400&a=true'],
        nameEn: 'S5PLE 5m Spruce',
        nameIt: 'S5PLE 5m Spruce',
        persons: 6
      },
  {
        assembled: 10599,
        category: 'premium',
        dims: '500×220×230cm',
        flatpack: 9379,
        id: 'S5PLT',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S5P/sauna-s5p-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S5P/sauna-s5p-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S5P/sauna-s5p-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S5P/sauna-s5p-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S5P/sauna-s5p-4.jpg&x=600&y=400&a=true'],
        nameEn: 'S5PLT 5m Thermowood',
        nameIt: 'S5PLT 5m Thermowood',
        persons: 6
      },
  {
        assembled: 8629,
        category: 'premium',
        dims: '400×200×210cm',
        flatpack: 7409,
        id: 'S424VE',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4PV/sauna-s4pv-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4PV/sauna-s4pv-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4PV/sauna-s4pv-4.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4PV/foto-1-4m-fasssauna-fur-4-pers-mit-vorraum-und-sitzen-aussen.jpg&x=600&y=400&a=true'],
        nameEn: 'S424VE 4m W2.4 Spruce',
        nameIt: 'S424VE 4m W2.4 Spruce',
        persons: 4
      },
  {
        assembled: 10319,
        category: 'premium',
        dims: '400×200×210cm',
        flatpack: 9099,
        id: 'S424VT',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4PV/sauna-s4pv-4.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4PV/sauna-s4pv-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4PV/sauna-s4pv-4.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Sauna-S4PV/foto-1-4m-fasssauna-fur-4-pers-mit-vorraum-und-sitzen-aussen.jpg&x=600&y=400&a=true'],
        nameEn: 'S424VT 4m W2.4 Thermo',
        nameIt: 'S424VT 4m W2.4 Thermo',
        persons: 4
      },
  {
        assembled: 3679,
        category: 'vertical',
        dims: '1.5x1.5m',
        flatpack: 3209,
        id: 'SHE',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Vertical%20Saunas/sauna-vert-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Vertical%20Saunas/sauna-vert-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Vertical%20Saunas/sauna-vert-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Vertical%20Saunas/sauna-vert-3.jpg&x=600&y=400&a=true'],
        nameEn: 'SHE Vertical 2p Spruce',
        nameIt: 'SHE Vertical 2p Spruce',
        persons: 2
      },
  {
        assembled: 4549,
        category: 'vertical',
        dims: '1.5x1.5m',
        flatpack: 4079,
        id: 'SHT',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Vertical%20Saunas/sauna-vert-2.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Vertical%20Saunas/sauna-vert-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Vertical%20Saunas/sauna-vert-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/92oLjF2RJHC6Y5K?file=/Vertical%20Saunas/sauna-vert-3.jpg&x=600&y=400&a=true'],
        nameEn: 'SHT Vertical 2p Thermo',
        nameIt: 'SHT Vertical 2p Thermo',
        persons: 2
      }
];

export const hottubs: Product[] = [
  {
        category: 'fiberglass',
        dims: '1.8x1.8m',
        id: 'TP8',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa-4.jpg&x=600&y=400&a=true'],
        nameEn: 'TP8 Octagonal 1.8x1.8m',
        nameIt: 'TP8 Ottagonale 1.8x1.8m',
        persons: 6,
        price: 1929
      },
  {
        category: 'fiberglass',
        dims: '2x2m',
        id: 'TP82',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa2x2-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa2x2-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa2x2-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa2x2-3.jpg&x=600&y=400&a=true'],
        nameEn: 'TP82 Octagonal 2x2m',
        nameIt: 'TP82 Ottagonale 2x2m',
        persons: 7,
        price: 2109
      },
  {
        category: 'fiberglass',
        dims: '2.4x1.8m',
        id: 'TP24',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa-2.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/3.%20OCTA%20-%20Fiberglass%20Hot%20Tubs/octa-4.jpg&x=600&y=400&a=true'],
        nameEn: 'TP24 Octagonal 2.4x1.8m',
        nameIt: 'TP24 Ottagonale 2.4x1.8m',
        persons: 9,
        price: 2519
      },
  {
        category: 'fiberglass',
        dims: '1.7x2m',
        id: 'TP217',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/5.%20QUATTRO%20-%20Fiberglass%20Hot%20Tubs/hot-tub-fiber-quattro-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/5.%20QUATTRO%20-%20Fiberglass%20Hot%20Tubs/hot-tub-fiber-quattro-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/5.%20QUATTRO%20-%20Fiberglass%20Hot%20Tubs/hot-tub-fiber-quattro-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/5.%20QUATTRO%20-%20Fiberglass%20Hot%20Tubs/hot-tub-fiber-quattro-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/5.%20QUATTRO%20-%20Fiberglass%20Hot%20Tubs/hot-tub-fiber-quattro-4.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/5.%20QUATTRO%20-%20Fiberglass%20Hot%20Tubs/hot-tub-fiber-quattro-5.jpg&x=600&y=400&a=true'],
        nameEn: 'TP217 Quattro 1.7x2m',
        nameIt: 'TP217 Quattro 1.7x2m',
        persons: 8,
        price: 2739
      },
  {
        category: 'fiberglass',
        dims: 'Ø1.8m',
        id: 'TP18',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/6.%20ROUND%20-%20Fiberglass%20Hot%20Tubs/1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/6.%20ROUND%20-%20Fiberglass%20Hot%20Tubs/1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/6.%20ROUND%20-%20Fiberglass%20Hot%20Tubs/2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/6.%20ROUND%20-%20Fiberglass%20Hot%20Tubs/hot-tub-fiber-outside-heater-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/6.%20ROUND%20-%20Fiberglass%20Hot%20Tubs/hot-tub-fiber-outside-heater-2.jpg&x=600&y=400&a=true'],
        nameEn: 'TP18 Round Ø1.8m',
        nameIt: 'TP18 Rotonda Ø1.8m',
        persons: 3,
        price: 1849
      },
  {
        category: 'fiberglass',
        dims: '1.85x0.95m',
        id: 'TP19',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/4.%20OVAL%20-%20Fiberglass%20Tot%20Tubs/hot-tub-fiber-oval-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/4.%20OVAL%20-%20Fiberglass%20Tot%20Tubs/hot-tub-fiber-oval-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/4.%20OVAL%20-%20Fiberglass%20Tot%20Tubs/hot-tub-fiber-oval-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/4.%20OVAL%20-%20Fiberglass%20Tot%20Tubs/hot-tub-fiber-oval-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/4.%20OVAL%20-%20Fiberglass%20Tot%20Tubs/hot-tub-fiber-oval-4.jpg&x=600&y=400&a=true'],
        nameEn: 'TP19 Oval 1.85x0.95m',
        nameIt: 'TP19 Ovale 1.85x0.95m',
        persons: 2,
        price: 1729
      },
  {
        category: 'fiberglass',
        dims: 'Ø1.8m',
        id: 'TP18V',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/6.%20ROUND%20-%20Fiberglass%20Hot%20Tubs/foto-1-badestamp-for-4-pers-i-glassfiber.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/6.%20ROUND%20-%20Fiberglass%20Hot%20Tubs/foto-1-badestamp-for-4-pers-i-glassfiber.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/6.%20ROUND%20-%20Fiberglass%20Hot%20Tubs/foto-2-badestamp-for-4-pers-i-glassfiber.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/6.%20ROUND%20-%20Fiberglass%20Hot%20Tubs/foto-3-badestamp-for-4-pers-i-glassfiber.jpg&x=600&y=400&a=true'],
        nameEn: 'TP18V Round Ø1.8m',
        nameIt: 'TP18V Rotonda Ø1.8m',
        persons: 4,
        price: 1909
      },
  {
        category: 'fiberglass',
        dims: 'Ø2m',
        id: 'TP2V',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/7.%20ROUND%20INTEGRATED%20-%20Fiberglass%20Hot%20Tubs/TP2B%20Blue1%201200x1200.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/7.%20ROUND%20INTEGRATED%20-%20Fiberglass%20Hot%20Tubs/TP2B%20Blue1%201200x1200.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/7.%20ROUND%20INTEGRATED%20-%20Fiberglass%20Hot%20Tubs/TP2B%20Black1%201200x1200.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/7.%20ROUND%20INTEGRATED%20-%20Fiberglass%20Hot%20Tubs/tp2v-s4.jpg&x=600&y=400&a=true'],
        nameEn: 'TP2V Round Ø2m',
        nameIt: 'TP2V Rotonda Ø2m',
        persons: 5,
        price: 3029
      },
  {
        assembled: 1259,
        category: 'wood',
        dims: 'Ø1.6m',
        flatpack: 1119,
        id: 'WS16E',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/VVNN%20svet.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/VVNN%20svet.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/VVNN%20svet%202.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/VVNN%20svet%203.jpg&x=600&y=400&a=true'],
        nameEn: 'WS Spruce Ø1.6 flat-pack',
        nameIt: 'WS Spruce Ø1.6 flat-pack',
        persons: 5
      },
  {
        assembled: 1419,
        category: 'wood',
        dims: 'Ø1.8m',
        flatpack: 1259,
        id: 'WS18E',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/VVNN%20svet.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/VVNN%20svet.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/VVNN%20svet%202.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/VVNN%20svet%203.jpg&x=600&y=400&a=true'],
        nameEn: 'WS Spruce Ø1.8',
        nameIt: 'WS Spruce Ø1.8',
        persons: 7
      },
  {
        assembled: 1569,
        category: 'wood',
        dims: 'Ø2.0m',
        flatpack: 1379,
        id: 'WS20E',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/VVNN%20svet.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/VVNN%20svet.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/VVNN%20svet%202.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/VVNN%20svet%203.jpg&x=600&y=400&a=true'],
        nameEn: 'WS Spruce Ø2.0',
        nameIt: 'WS Spruce Ø2.0',
        persons: 9
      },
  {
        assembled: 1909,
        category: 'wood',
        dims: 'Ø1.6m',
        flatpack: 1769,
        id: 'WS16T',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-4.jpg&x=600&y=400&a=true'],
        nameEn: 'WS Thermowood Ø1.6',
        nameIt: 'WS Thermowood Ø1.6',
        persons: 5
      },
  {
        assembled: 2089,
        category: 'wood',
        dims: 'Ø1.8m',
        flatpack: 1929,
        id: 'WS18T',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-4.jpg&x=600&y=400&a=true'],
        nameEn: 'WS Thermowood Ø1.8',
        nameIt: 'WS Thermowood Ø1.8',
        persons: 7
      },
  {
        assembled: 2339,
        category: 'wood',
        dims: 'Ø2.0m',
        flatpack: 2149,
        id: 'WS20T',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-1.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-1.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-2.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-3.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/10.%20WOODEN%20-%20Hot%20Tubs%20With%20Outside%20Heater/larch-4.jpg&x=600&y=400&a=true'],
        nameEn: 'WS Thermowood Ø2.0',
        nameIt: 'WS Thermowood Ø2.0',
        persons: 9
      }
];

export const icebaths: Product[] = [
  {
        dims: 'Ø0.9m',
        id: 'LN9',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/2.%20ICE%20TUBS%20-%20Stainless%20Steel/IMG_4576.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/2.%20ICE%20TUBS%20-%20Stainless%20Steel/IMG_4576.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/2.%20ICE%20TUBS%20-%20Stainless%20Steel/IMG_4584.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/2.%20ICE%20TUBS%20-%20Stainless%20Steel/IMG_4586.jpg&x=600&y=400&a=true'],
        nameEn: 'LN9 Stainless Steel D=0.9m',
        nameIt: 'LN9 Acciaio Inox D=0.9m',
        persons: 1,
        price: 1949
      },
  {
        dims: 'Ø1.0m',
        id: 'TP10',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/1.%20ICE%20TUBS%20-%20Fiberglass/Fiberglass%20Cold%20Plunge%20Tub%20for%20One%201.jpg&x=600&y=400&a=true',
        images: ['https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/1.%20ICE%20TUBS%20-%20Fiberglass/Fiberglass%20Cold%20Plunge%20Tub%20for%20One%201.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/1.%20ICE%20TUBS%20-%20Fiberglass/Fiberglass%20Cold%20Plunge%20Tub%20for%20One%202.jpg&x=600&y=400&a=true', 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/1.%20ICE%20TUBS%20-%20Fiberglass/Fiberglass%20Cold%20Plunge%20Tub%20for%20One%203.jpg&x=600&y=400&a=true'],
        nameEn: 'TP10 Fiberglass D=1m',
        nameIt: 'TP10 Fiberglass D=1m',
        persons: 1,
        price: 1199
      }
];

export const saunaHeaters: Heater[] = [
  {
        id: 'M60',
        nameEn: 'Harvia Top Steel 6kW',
        nameIt: 'Harvia Top Steel 6kW',
        price: 489,
        type: 'electric'
      },
  {
        id: 'M80',
        nameEn: 'Harvia Top Steel 8kW',
        nameIt: 'Harvia Top Steel 8kW',
        price: 549,
        type: 'electric'
      },
  {
        id: 'PC70',
        nameEn: 'Harvia Cilindro 6.8kW',
        nameIt: 'Harvia Cilindro 6.8kW',
        price: 689,
        type: 'electric'
      },
  {
        id: 'PC90',
        nameEn: 'Harvia Cilindro 9kW',
        nameIt: 'Harvia Cilindro 9kW',
        price: 849,
        type: 'electric'
      },
  {
        id: 'HUUM1',
        nameEn: 'HUUM DROP 6kW',
        nameIt: 'HUUM DROP 6kW',
        price: 1989,
        type: 'electric'
      },
  {
        id: 'HUUM2',
        nameEn: 'HUUM DROP 9kW',
        nameIt: 'HUUM DROP 9kW',
        price: 2129,
        type: 'electric'
      },
  {
        id: 'HUUM3',
        nameEn: 'HUUM HIVE MINI 9kW',
        nameIt: 'HUUM HIVE MINI 9kW',
        price: 2949,
        type: 'electric'
      },
  {
        id: 'HUUM4',
        nameEn: 'HUUM HIVE MINI 11kW',
        nameIt: 'HUUM HIVE MINI 11kW',
        price: 3029,
        type: 'electric'
      },
  {
        id: 'WM3',
        nameEn: 'Set Harvia M3 (wood)',
        nameIt: 'Set Harvia M3 (legna)',
        price: 1479,
        type: 'wood'
      },
  {
        id: 'WM20',
        nameEn: 'Set Harvia 20 Pro (wood)',
        nameIt: 'Set Harvia 20 Pro (legna)',
        price: 1989,
        type: 'wood'
      },
  {
        id: 'WC12',
        nameEn: 'Set Cozy 12 (wood)',
        nameIt: 'Set Cozy 12 (legna)',
        price: 2009,
        type: 'wood'
      },
  {
        id: 'WC18',
        nameEn: 'Set Cozy 18 (wood)',
        nameIt: 'Set Cozy 18 (legna)',
        price: 2279,
        type: 'wood'
      },
  {
        id: 'WN16',
        nameEn: 'Set Narvi NC 16 (wood)',
        nameIt: 'Set Narvi NC 16 (legna)',
        price: 1969,
        type: 'wood'
      },
  {
        id: 'WV',
        nameEn: 'Set Vilpra Fornax-E (wood)',
        nameIt: 'Set Vilpra Fornax-E (legna)',
        price: 1809,
        type: 'wood'
      },
  {
        id: 'WHH13',
        nameEn: 'Set HUUM HIVE Wood 13 (wood)',
        nameIt: 'Set HUUM HIVE Wood 13 (legna)',
        price: 3109,
        type: 'wood'
      },
  {
        id: 'WHF',
        nameEn: 'Set HUUM HIVE Flow (wood)',
        nameIt: 'Set HUUM HIVE Flow (legna)',
        price: 4039,
        type: 'wood'
      }
];

export const hottubHeaters: Heater[] = [
  {
        id: 'NA27',
        nameEn: 'NA27 Outside Aluminium 27kW',
        nameIt: 'NA27 Alluminio Esterno 27kW',
        price: 1079,
        type: 'stove'
      },
  {
        id: 'NA35',
        nameEn: 'NA35 Outside Aluminium 35kW',
        nameIt: 'NA35 Alluminio Esterno 35kW',
        price: 1299,
        type: 'stove'
      },
  {
        id: 'NN304',
        nameEn: 'NN AISI304 Outside Stainless Steel',
        nameIt: 'NN AISI304 Acciaio Esterno',
        price: 1319,
        type: 'stove'
      },
  {
        id: 'NN316',
        nameEn: 'NN AISI316 Outside Stainless Steel',
        nameIt: 'NN AISI316 Acciaio Esterno',
        price: 1749,
        type: 'stove'
      },
  {
        id: 'VA',
        nameEn: 'VA Inside Aluminium',
        nameIt: 'VA Alluminio Interno',
        price: 709,
        type: 'stove'
      },
  {
        id: 'VN',
        nameEn: 'VN Inside Stainless Steel',
        nameIt: 'VN Acciaio Interno',
        price: 709,
        type: 'stove'
      }
];

export const saunaAccessories: Accessory[] = [
  {
        category: 'sauna',
        descEn: 'Classic 3-litre wooden bucket with a high-temperature-resistant plastic interior insert. The bamboo handle and Scandinavian design make it perfect for your barrel sauna. Includes a matching 42 cm ladle. Requires no prior preparation and is resistant to decay over time.',
        descIt: 'Secchiello in legno da 3 litri con inserto interno in plastica resistente alle alte temperature. Il manico in bamboo e il design scandinavo classico lo rendono perfetto per la vostra sauna a botte. Include mestolo coordinato da 42 cm. Non richiede preparazione e resiste alla decomposizione nel tempo.',
        id: 'BUCKET',
        image: 'https://images.pexels.com/photos/34097636/pexels-photo-34097636/free-photo-of-relaxing-sauna-experience-with-nordic-design.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        nameEn: 'Bucket & Ladle Set',
        nameIt: 'Set Secchiello e Mestolo',
        price: 49,
        specsEn: 'Volume: 3 litres | Diameter: 23 cm | Ladle: 42 cm | Material: Wood with plastic insert | Handle: Bamboo',
        specsIt: 'Volume: 3 litri | Diametro: 23 cm | Mestolo: 42 cm | Materiale: Legno con inserto in plastica | Manico: Bamboo'
      },
  {
        category: 'sauna',
        descEn: 'An important and useful accessory that allows you to regulate the climate in your sauna room according to individual preferences. The device body is made of treated wood with a precision bi-metal thermometer sensor. Simple wall mounting and clear reading.',
        descIt: 'Accessorio utile e importante che permette di regolare il clima nella vostra sauna secondo le preferenze individuali. Il corpo del dispositivo è realizzato in legno trattato con sensore termometrico bimetallico di precisione. Montaggio a parete semplice e lettura chiara.',
        id: 'THERMO',
        image: 'https://images.pexels.com/photos/31092894/pexels-photo-31092894/free-photo-of-cozy-evening-in-a-nordic-sauna.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        nameEn: 'Sauna Thermometer/Hygrometer',
        nameIt: 'Termometro/Igrometro Sauna',
        price: 39,
        specsEn: 'Dimensions: 26 x 14 x 3 cm | Sensor: Bi-metal | Body: Treated wood | Mounting: Wall-mounted',
        specsIt: 'Dimensioni: 26 x 14 x 3 cm | Sensore: Bimetallico | Corpo: Legno trattato | Montaggio: A parete'
      },
  {
        category: 'sauna',
        descEn: 'Natural stones specially selected for sauna heaters. These stones accumulate heat efficiently and produce soft, pleasant steam when water is poured over them. Resistant to thermal shock and long-lasting. 20 kg package.',
        descIt: 'Pietre naturali selezionate appositamente per stufe da sauna. Queste pietre accumulano calore in modo efficiente e producono un vapore morbido e piacevole quando vi si versa l\'acqua sopra. Resistenti agli shock termici e di lunga durata. Confezione da 20 kg.',
        id: 'STONES',
        image: 'https://images.pexels.com/photos/32504789/pexels-photo-32504789/free-photo-of-steam-rising-from-sauna-stones-with-ladle.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        nameEn: 'Sauna Stones 20kg',
        nameIt: 'Pietre per Sauna 20kg',
        price: 49,
        specsEn: 'Weight: 20 kg | Type: Selected natural stones | Use: Wood-fired and electric heaters | Lifespan: Replace every 1-2 years with regular use',
        specsIt: 'Peso: 20 kg | Tipo: Pietre naturali selezionate | Uso: Stufe a legna ed elettriche | Durata: Sostituire ogni 1-2 anni con uso regolare'
      },
  {
        category: 'sauna',
        descEn: 'Set of 5 pure essential oils for sauna aromatherapy. Includes eucalyptus, pine, lavender, mint, and birch. Add a few drops to the bucket water before pouring over stones to create a relaxing and beneficial atmosphere. Compatible with stainless steel fragrance holders.',
        descIt: 'Set di 5 oli essenziali puri per aromaterapia in sauna. Include eucalipto, pino, lavanda, menta e betulla. Aggiungete poche gocce all\'acqua del secchiello prima di versarla sulle pietre per creare un\'atmosfera rilassante e benefica. Compatibile con portafragranze in acciaio.',
        id: 'OILS',
        image: 'https://images.pexels.com/photos/6693918/pexels-photo-6693918.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        nameEn: 'Essential Oil Set (5 fragrances)',
        nameIt: 'Olio Essenziale Set (5 fragranze)',
        price: 39,
        specsEn: 'Contents: 5 bottles x 10 ml | Fragrances: Eucalyptus, Pine, Lavender, Mint, Birch | 100% pure essential oils',
        specsIt: 'Contenuto: 5 boccette x 10 ml | Fragranze: Eucalipto, Pino, Lavanda, Menta, Betulla | 100% puri oli essenziali'
      },
  {
        category: 'sauna',
        descEn: 'Ergonomic natural wood headrest for optimal comfort during your sauna session. The curved design adapts to the shape of your head and neck, allowing complete relaxation. Made from heat and moisture-resistant wood.',
        descIt: 'Poggiatesta ergonomico in legno naturale per un comfort ottimale durante la sessione in sauna. Il design curvo si adatta alla forma della testa e del collo, permettendo un rilassamento completo. Realizzato in legno resistente al calore e all\'umidità.',
        id: 'HEADREST',
        image: 'https://images.pexels.com/photos/6628475/pexels-photo-6628475.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        nameEn: 'Wooden Headrest',
        nameIt: 'Poggiatesta in Legno',
        price: 35,
        specsEn: 'Material: Treated natural wood | Design: Ergonomic curved | Resistance: Heat and moisture | Care: Dry after use',
        specsIt: 'Materiale: Legno naturale trattato | Design: Ergonomico curvo | Resistenza: Calore e umidità | Manutenzione: Asciugare dopo l\'uso'
      },
  {
        category: 'sauna',
        descEn: 'Sauna sand timer with aluminium and pine frame. Allows you to monitor fixed 15-minute intervals for safe, controlled sessions. Best fitted to the wall opposite the heater for easy reading.',
        descIt: 'Clessidra da sauna con cornice in alluminio e pino. Permette di monitorare intervalli fissi di 15 minuti per sessioni sicure e controllate. Si consiglia di montarla sulla parete opposta alla stufa per una facile lettura.',
        id: 'SANDTIMER',
        image: 'https://images.pexels.com/photos/5942185/pexels-photo-5942185.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        nameEn: 'Sauna Sand Timer',
        nameIt: 'Clessidra da Sauna',
        price: 25,
        specsEn: 'Material: Aluminium + Pine | Duration: 15 minutes | Dimensions: 34 x 7 x 4 cm | Mounting: Wall-mounted',
        specsIt: 'Materiale: Alluminio + Pino | Durata: 15 minuti | Dimensioni: 34 x 7 x 4 cm | Montaggio: A parete'
      },
  {
        category: 'sauna',
        descEn: 'Set of 2 high-quality microfiber towels, ideal for sauna, beach, travel, and sport. Very light and compact, they dry quickly and absorb large amounts of moisture. Soft and pleasant to touch, easy to wash.',
        descIt: 'Set di 2 teli in microfibra di alta qualità, ideali per sauna, spiaggia, viaggio e sport. Molto leggeri e compatti, si asciugano rapidamente e assorbono grandi quantità di umidità. Morbidi e piacevoli al tatto, facili da lavare.',
        id: 'TOWEL',
        image: 'https://images.pexels.com/photos/8092430/pexels-photo-8092430.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        nameEn: 'Premium Sauna Towel',
        nameIt: 'Telo Sauna Premium',
        price: 29,
        specsEn: 'Contents: 2 towels (80x160 cm + 30x50 cm) | Weight: 312 g | Material: Soft microfiber | Washing: 30-40°C',
        specsIt: 'Contenuto: 2 teli (80x160 cm + 30x50 cm) | Peso: 312 g | Materiale: Microfibra morbida | Lavaggio: 30-40°C'
      },
  {
        category: 'sauna',
        descEn: 'LED interior lighting system for saunas with warm, soft light. Creates a relaxing and welcoming atmosphere during your sessions. Designed for high-temperature, high-humidity environments with simple and safe installation.',
        descIt: 'Sistema di illuminazione LED per interni sauna con luce calda e soffusa. Crea un\'atmosfera rilassante e accogliente durante le vostre sessioni. Progettato per ambienti ad alta temperatura e umidità, con installazione semplice e sicura.',
        id: 'LIGHT',
        image: 'https://images.pexels.com/photos/34195903/pexels-photo-34195903/free-photo-of-vibrant-led-light-strip-with-neon-glow-effect.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        nameEn: 'LED Lighting System',
        nameIt: 'Sistema Illuminazione LED',
        price: 219,
        specsEn: 'Type: Low-voltage LED | Resistance: High temperature and humidity | Light: Warm white | Installation: Designed for interior mounting',
        specsIt: 'Tipo: LED a bassa tensione | Resistenza: Alta temperatura e umidità | Luce: Bianca calda | Installazione: Predisposta per montaggio interno'
      }
];

export const hottubAccessories: Accessory[] = [
  {
        category: 'hottub',
        descEn: 'Custom-fit insulated thermal cover for your hot tub. Maintains water heat, reduces heating times, and protects the tub from leaves and debris. Made with weather-resistant and UV-resistant materials.',
        descIt: 'Copertura termica isolante su misura per la vostra vasca idromassaggio. Mantiene il calore dell\'acqua, riduce i tempi di riscaldamento e protegge la vasca da foglie e detriti. Realizzata con materiali resistenti alle intemperie e ai raggi UV.',
        id: 'HTCOVER',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/13.%20Accessories%20-%20Hot%20Tub/flanc-cover.jpg&x=600&y=400&a=true',
        nameEn: 'Thermal Cover',
        nameIt: 'Copertura Termica',
        price: 299,
        specsEn: 'Material: UV-resistant PVC | Insulation: High-density foam | Fastening: Side straps | Custom-fit for your model',
        specsIt: 'Materiale: PVC resistente UV | Isolamento: Schiuma ad alta densità | Fissaggio: Cinghie laterali | Su misura per il vostro modello'
      },
  {
        category: 'hottub',
        descEn: 'Water purification filter that removes substances and fats with an absolute minimal amount of chemical additives. Set includes filter, polyethylene filtration balls, 2 m hose, flanges, clamps, and plugs. Maximum flowrate 3.6 m³/h.',
        descIt: 'Filtro per purificazione acqua che rimuove sostanze e grassi con una quantità minima di additivi chimici. Il set include filtro, sfere di filtrazione in polietilene, tubo da 2 m, flange, morsetti e tappi. Portata massima 3,6 m³/h.',
        id: 'HTFILTER',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/13.%20Accessories%20-%20Hot%20Tub/filter-si2000.jpg&x=600&y=400&a=true',
        nameEn: 'Filtration System',
        nameIt: 'Sistema di Filtrazione',
        price: 189,
        specsEn: 'Power: 140 W | Voltage: 220-240 V | Filter volume: 15 litres | Max flowrate: 3.6 m³/h | Connections: IN/OUT Ø 32/38 mm',
        specsIt: 'Potenza: 140 W | Tensione: 220-240 V | Volume filtro: 15 litri | Portata max: 3,6 m³/h | Connessioni: IN/OUT Ø 32/38 mm'
      },
  {
        category: 'hottub',
        descEn: 'Stainless steel chimney extension module for wood-fired hot tub stoves. Length 1 metre, diameter 114 mm. High-quality stainless steel characterized by high durability and corrosion resistance.',
        descIt: 'Modulo prolunga camino in acciaio inossidabile per stufe da vasca idromassaggio a legna. Lunghezza 1 metro, diametro 114 mm. Acciaio inox di alta qualità caratterizzato da elevata durabilità e resistenza alla corrosione.',
        id: 'HTCHIMNEY',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/13.%20Accessories%20-%20Hot%20Tub/chimney-1.jpg&x=600&y=400&a=true',
        nameEn: 'Chimney Extension 1m',
        nameIt: 'Prolunga Camino 1m',
        price: 59,
        specsEn: 'Length: 1 m | Diameter: 114 mm | Material: Stainless steel | Resistance: Corrosion and high temperatures',
        specsIt: 'Lunghezza: 1 m | Diametro: 114 mm | Materiale: Acciaio inossidabile | Resistenza: Corrosione e alte temperature'
      },
  {
        category: 'hottub',
        descEn: 'Wooden paddle for mixing water in your wood-fired hot tub. Allows you to evenly distribute heat in the water during heating, avoiding hot or cold spots. Long, comfortable handle.',
        descIt: 'Paletta in legno per mescolare l\'acqua nella vasca idromassaggio a legna. Permette di distribuire uniformemente il calore nell\'acqua durante il riscaldamento, evitando zone troppo calde o troppo fredde. Manico lungo e comodo.',
        id: 'HTPADDLE',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/13.%20Accessories%20-%20Hot%20Tub/paddle.jpg&x=600&y=400&a=true',
        nameEn: 'Mixing Paddle',
        nameIt: 'Paletta per Miscelazione',
        price: 29,
        specsEn: 'Material: Natural wood | Use: Water mixing during heating | Handle: Long ergonomic',
        specsIt: 'Materiale: Legno naturale | Uso: Miscelazione acqua durante riscaldamento | Manico: Lungo ergonomico'
      },
  {
        category: 'hottub',
        descEn: 'Ergonomic headrest for hot tubs. Attaches to the tub rim and provides comfortable support for head and neck during bathing. Made from water-resistant materials.',
        descIt: 'Poggiatesta ergonomico per vasca idromassaggio. Si fissa al bordo della vasca e offre un supporto confortevole per testa e collo durante il bagno. Realizzato in materiali resistenti all\'acqua.',
        id: 'HTHEAD',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/13.%20Accessories%20-%20Hot%20Tub/headrest-1.jpg&x=600&y=400&a=true',
        nameEn: 'Headrest',
        nameIt: 'Poggiatesta',
        price: 45,
        specsEn: 'Mounting: On tub rim | Material: Water-resistant | Design: Ergonomic',
        specsIt: 'Montaggio: Sul bordo vasca | Materiale: Resistente all\'acqua | Design: Ergonomico'
      },
  {
        category: 'hottub',
        descEn: 'Set of 8 underwater LED lights in chrome nozzles, installed on the bottom of the tub. Change the water colour with 7 modes: red, green, blue, yellow, purple, turquoise, and white. Chrome pneumatic switch included. Low energy consumption and long-lasting.',
        descIt: 'Set di 8 luci LED subacquee in bocchette cromate, installate sul fondo della vasca. Permettono di cambiare il colore dell\'acqua con 7 modalità: rosso, verde, blu, giallo, viola, turchese e bianco. Interruttore pneumatico cromato incluso. Consumo energetico ridotto e lunga durata.',
        id: 'HTLED',
        image: 'https://images.pexels.com/photos/6489046/pexels-photo-6489046.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        nameEn: 'Underwater LED Lights',
        nameIt: 'Luci LED Subacquee',
        price: 159,
        specsEn: 'LEDs: 8 units in chrome nozzles | Consumption: 5 W | Wattage: 3 W | Colours: 7 modes | Switch: Chrome pneumatic',
        specsIt: 'LED: 8 unità in bocchette cromate | Consumo: 5 W | Potenza: 3 W | Colori: 7 modalità | Interruttore: Pneumatico cromato'
      },
  {
        category: 'hottub',
        descEn: 'Floating thermometer to monitor water temperature in your hot tub. Water-resistant design with clear and accurate reading. Floats on the surface for easy checking during bathing.',
        descIt: 'Termometro galleggiante per monitorare la temperatura dell\'acqua nella vostra vasca idromassaggio. Design resistente all\'acqua con lettura chiara e precisa. Galleggia in superficie per un facile controllo durante il bagno.',
        id: 'HTTHERM',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/13.%20Accessories%20-%20Hot%20Tub/term.jpg&x=600&y=400&a=true',
        nameEn: 'Floating Thermometer',
        nameIt: 'Termometro Galleggiante',
        price: 19,
        specsEn: 'Type: Floating | Reading: Clear analogue | Resistance: Waterproof | Scale: Celsius and Fahrenheit',
        specsIt: 'Tipo: Galleggiante | Lettura: Analogica chiara | Resistenza: Impermeabile | Scala: Celsius e Fahrenheit'
      },
  {
        category: 'hottub',
        descEn: 'Stainless steel guard that surrounds the hot chimney, preventing bathers from touching it and getting burnt. High-quality stainless steel, durable and corrosion-resistant. Essential safety accessory for families with children.',
        descIt: 'Protezione in acciaio inossidabile che circonda il camino caldo, impedendo ai bagnanti di toccarlo e scottarsi. Acciaio inox di alta qualità, durevole e resistente alla corrosione. Accessorio di sicurezza essenziale per famiglie con bambini.',
        id: 'HTPROTECT',
        image: 'https://share.baltresto.com/index.php/apps/files_sharing/publicpreview/XZtB4r9YgEaqetz?file=/13.%20Accessories%20-%20Hot%20Tub/protection.jpg&x=600&y=400&a=true',
        nameEn: 'Anti-Scald Protection',
        nameIt: 'Protezione Anti-Scottatura',
        price: 39,
        specsEn: 'Material: Stainless steel | Function: Chimney anti-scald protection | Quality: High durability',
        specsIt: 'Materiale: Acciaio inossidabile | Funzione: Protezione anti-scottatura camino | Qualità: Alta durabilità'
      }
];

export const icebathAccessories: Accessory[] = [
  {
        category: 'icebath',
        descEn: 'Professional cooling system to maintain ice bath water at the desired temperature without needing to add ice. Rapid cooling and constant temperature maintenance. Ideal for frequent and professional use.',
        descIt: 'Sistema di raffreddamento professionale per mantenere l\'acqua del bagno di ghiaccio alla temperatura desiderata senza bisogno di aggiungere ghiaccio. Raffreddamento rapido e mantenimento costante della temperatura. Ideale per uso frequente e professionale.',
        id: 'IBCHILLER',
        image: 'https://images.pexels.com/photos/3985077/pexels-photo-3985077.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        nameEn: 'Professional Chiller',
        nameIt: 'Chiller Professionale',
        price: 2499,
        specsEn: 'Type: Professional compressor | Cooling: Fast and efficient | Control: Digital temperature | Use: Professional and residential',
        specsIt: 'Tipo: Compressore professionale | Raffreddamento: Rapido ed efficiente | Controllo: Temperatura digitale | Uso: Professionale e residenziale'
      },
  {
        category: 'icebath',
        descEn: 'Insulated cover for ice bath that maintains cold water temperature and protects from debris. Significantly reduces chiller energy consumption and keeps water clean between uses.',
        descIt: 'Copertura isolante per bagno di ghiaccio che mantiene la temperatura fredda dell\'acqua e protegge da detriti. Riduce significativamente il consumo energetico del chiller e mantiene l\'acqua pulita tra un utilizzo e l\'altro.',
        id: 'IBCOVER',
        image: 'https://images.pexels.com/photos/8845118/pexels-photo-8845118.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        nameEn: 'Insulated Cover',
        nameIt: 'Copertura Isolante',
        price: 199,
        specsEn: 'Material: High-density insulation | Protection: Debris and heat | Savings: Reduces chiller energy consumption',
        specsIt: 'Materiale: Isolante ad alta densità | Protezione: Detriti e calore | Risparmio: Riduce consumo energetico chiller'
      },
  {
        category: 'icebath',
        descEn: 'Waterproof digital thermometer for accurately monitoring water temperature in your ice bath. Clear LCD display, easy to read even in low-light conditions. Essential for safe and controlled sessions.',
        descIt: 'Termometro digitale impermeabile per monitorare con precisione la temperatura dell\'acqua nel bagno di ghiaccio. Display LCD chiaro e facile da leggere, anche in condizioni di scarsa illuminazione. Essenziale per sessioni sicure e controllate.',
        id: 'IBTHERM',
        image: 'https://images.pexels.com/photos/6753152/pexels-photo-6753152.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
        nameEn: 'Digital Thermometer',
        nameIt: 'Termometro Digitale',
        price: 29,
        specsEn: 'Display: Digital LCD | Accuracy: ±0.5°C | Resistance: Waterproof | Battery: Long-lasting',
        specsIt: 'Display: LCD digitale | Precisione: ±0.5°C | Resistenza: Impermeabile | Batteria: Lunga durata'
      }
];
