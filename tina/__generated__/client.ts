import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '11843448acdbfae47352ab5f31b3ecbe3a427147', queries,  });
export default client;
  