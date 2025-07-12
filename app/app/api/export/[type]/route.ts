
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    const { type } = params

    let data: any = {}

    switch (type) {
      case 'contacts':
        data = await prisma.contact.findMany({
          include: {
            customFields: true,
            emergencyContacts: true,
            contactTags: { include: { tag: true } },
            groupMemberships: { include: { group: true } }
          }
        })
        break

      case 'interactions':
        data = await prisma.interaction.findMany({
          include: { contact: true }
        })
        break

      case 'reminders':
        data = await prisma.reminder.findMany({
          include: { contact: true }
        })
        break

      case 'all':
        data = {
          contacts: await prisma.contact.findMany({
            include: {
              interactions: true,
              customFields: true,
              emergencyContacts: true,
              contactTags: { include: { tag: true } },
              groupMemberships: { include: { group: true } },
              reminders: true
            }
          }),
          groups: await prisma.group.findMany({
            include: { members: { include: { contact: true } } }
          }),
          tags: await prisma.tag.findMany({
            include: { contactTags: { include: { contact: true } } }
          }),
          albums: await prisma.album.findMany({
            include: { media: true, shares: true }
          })
        }
        break

      default:
        return NextResponse.json(
          { error: 'Invalid export type' },
          { status: 400 }
        )
    }

    if (format === 'csv') {
      // Convert to CSV format
      const csv = convertToCSV(data, type)
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${type}-export.csv"`
        }
      })
    } else {
      // Return JSON format
      const jsonData = JSON.stringify(data, null, 2)
      
      return new NextResponse(jsonData, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${type}-export.json"`
        }
      })
    }
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    )
  }
}

function convertToCSV(data: any, type: string): string {
  if (!Array.isArray(data)) {
    return 'No data available'
  }

  if (data.length === 0) {
    return 'No data available'
  }

  // Get headers from first object
  const headers = Object.keys(data[0]).filter(key => 
    typeof data[0][key] !== 'object' || data[0][key] === null
  )

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        if (value === null || value === undefined) return ''
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(',')
    )
  ].join('\n')

  return csvContent
}