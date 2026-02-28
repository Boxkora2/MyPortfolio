import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import React from 'react'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'Vo Thanh Phat'
  const subtitle = searchParams.get('subtitle') ?? 'Frontend Developer'

  const techItems = ['Next.js', 'TypeScript', 'React', 'Tailwind CSS']

  return new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0f2e 50%, #0a1628 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        },
      },
      // Top-right glow
      React.createElement('div', {
        style: {
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
          display: 'flex',
        },
      }),
      // Bottom-left glow
      React.createElement('div', {
        style: {
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
          display: 'flex',
        },
      }),
      // Badge
      React.createElement(
        'div',
        {
          style: {
            color: '#c084fc',
            fontSize: '18px',
            marginBottom: '20px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            display: 'flex',
          },
        },
        '\u2726 Portfolio \u2726'
      ),
      // Main title
      React.createElement(
        'div',
        {
          style: {
            color: '#ffffff',
            fontSize: title.length > 20 ? 56 : 72,
            fontWeight: 'bold',
            textAlign: 'center' as const,
            lineHeight: 1.1,
            marginBottom: '20px',
            display: 'flex',
          },
        },
        title
      ),
      // Subtitle
      React.createElement(
        'div',
        {
          style: {
            color: '#67e8f9',
            fontSize: '30px',
            fontWeight: '500',
            marginBottom: '36px',
            display: 'flex',
          },
        },
        subtitle
      ),
      // Divider
      React.createElement('div', {
        style: {
          width: '120px',
          height: '3px',
          background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
          borderRadius: '2px',
          marginBottom: '36px',
          display: 'flex',
        },
      }),
      // Tech badges
      React.createElement(
        'div',
        { style: { display: 'flex', gap: '16px', marginBottom: '48px' } },
        ...techItems.map((tech) =>
          React.createElement(
            'div',
            {
              key: tech,
              style: {
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#a1a1aa',
                fontSize: '16px',
                padding: '8px 18px',
                borderRadius: '20px',
                display: 'flex',
              },
            },
            tech
          )
        )
      ),
      // Domain
      React.createElement(
        'div',
        {
          style: {
            position: 'absolute',
            bottom: '36px',
            right: '60px',
            color: 'rgba(255,255,255,0.35)',
            fontSize: '18px',
            display: 'flex',
            letterSpacing: '1px',
          },
        },
        'korachoco.cv'
      ),
      // Left accent bar
      React.createElement('div', {
        style: {
          position: 'absolute',
          left: '0',
          top: '0',
          bottom: '0',
          width: '5px',
          background: 'linear-gradient(180deg, #7c3aed, #06b6d4, #7c3aed)',
          display: 'flex',
        },
      })
    ),
    { width: 1200, height: 630 }
  )
}

