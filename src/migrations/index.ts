import * as migration_20260121_122253_update_live_stream_schema from './20260121_122253_update_live_stream_schema';
import * as migration_20260121_125404_add_channel_id_to_livestream from './20260121_125404_add_channel_id_to_livestream';
import * as migration_20260121_131454_add_prayer_requests from './20260121_131454_add_prayer_requests';

export const migrations = [
  {
    up: migration_20260121_122253_update_live_stream_schema.up,
    down: migration_20260121_122253_update_live_stream_schema.down,
    name: '20260121_122253_update_live_stream_schema',
  },
  {
    up: migration_20260121_125404_add_channel_id_to_livestream.up,
    down: migration_20260121_125404_add_channel_id_to_livestream.down,
    name: '20260121_125404_add_channel_id_to_livestream',
  },
  {
    up: migration_20260121_131454_add_prayer_requests.up,
    down: migration_20260121_131454_add_prayer_requests.down,
    name: '20260121_131454_add_prayer_requests'
  },
];
