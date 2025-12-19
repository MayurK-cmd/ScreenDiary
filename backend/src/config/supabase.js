import { createClient } from '@supabase/supabase-js';  // Correct the typo

import {ENV} from '../config/env.js';

export const supabase = createClient(
    ENV.SUPABASE_URL,
    ENV.SUPABASE_SERVICE_KEY

);