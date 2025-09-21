import { supabase } from '../lib/supabase.js'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { from, to } = req.query
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(from.eq.${from},to.eq.${to}),and(from.eq.${to},to.eq.${from})`)
      .order('created_at', { ascending: true })
    
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data)
  }
  
  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        ...req.body,
        created_at: new Date().toISOString()
      }])
      .select()
    
    if (error) return res.status(500).json({ error: error.message })
    return res.json(data[0])
  }
  
  res.status(405).json({ error: 'Method not allowed' })
}