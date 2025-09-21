import { supabase } from '../lib/supabase.js'

export default async function handler(req, res) {
  // Adicionar CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('public', true)
      
      if (error) {
        console.error('Supabase error:', error)
        return res.status(500).json({ error: error.message })
      }
      
      return res.json(data || [])
    } catch (err) {
      console.error('API error:', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
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