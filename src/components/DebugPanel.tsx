'use client'

import { useState, useEffect } from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import { supabase } from '@/lib/supabase'

export default function DebugPanel() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [serverDebug, setServerDebug] = useState<any>(null)

  useEffect(() => {
    // Client-side environment check
    const clientInfo = {
      supabaseUrlExists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKeyExists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...' || 'MISSING',
      supabaseClientInitialized: !!supabase,
      timestamp: new Date().toISOString(),
    }
    setDebugInfo(clientInfo)

    // Fetch server-side debug info
    fetch('/api/debug-env')
      .then(res => res.json())
      .then(data => setServerDebug(data))
      .catch(err => setServerDebug({ error: err.message }))
  }, [])

  const testSupabaseConnection = async () => {
    if (!supabase) {
      alert('❌ Supabase client not initialized!')
      return
    }

    try {
      const { data, error } = await supabase.from('skills').select('count', { count: 'exact', head: true })
      if (error) {
        alert('❌ Supabase Error: ' + error.message)
      } else {
        alert('✅ Supabase connection successful!')
      }
    } catch (err) {
      alert('❌ Error: ' + (err instanceof Error ? err.message : 'Unknown'))
    }
  }

  if (!debugInfo) return null

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, maxWidth: 400 }}>
      <Paper sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.9)', color: 'white' }}>
        <Typography variant="h6" gutterBottom>🔍 Debug Info</Typography>
        
        <Typography variant="subtitle2" sx={{ mt: 2 }}>Client-side:</Typography>
        <pre style={{ fontSize: '10px', overflow: 'auto' }}>
          {JSON.stringify(debugInfo, null, 2)}
        </pre>

        <Typography variant="subtitle2" sx={{ mt: 2 }}>Server-side:</Typography>
        <pre style={{ fontSize: '10px', overflow: 'auto' }}>
          {serverDebug ? JSON.stringify(serverDebug, null, 2) : 'Loading...'}
        </pre>

        <Button 
          variant="contained" 
          size="small" 
          onClick={testSupabaseConnection}
          sx={{ mt: 2 }}
        >
          Test Supabase Connection
        </Button>
      </Paper>
    </Box>
  )
}

