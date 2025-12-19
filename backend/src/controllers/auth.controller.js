import {supabase} from '../config/supabase.js';

export async function walletAuth(req, res) {
  const {walletAddress} = req.body;

  const {data:user} = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();

    if(user) return res.json(user);

    const {data:newUser, error} = await supabase
    .from('users')
    .insert({wallet_address: walletAddress})
    .select()
    .single();

    res.json(newUser);
}