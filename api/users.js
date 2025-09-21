import { supabase } from '../lib/supabase.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('public', true)
    
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data)
  }
  
  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from('users')
      .insert([req.body])
      .select()
    
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data[0])
  }
  
  res.status(405).json({ error: 'Method not allowed' })
}