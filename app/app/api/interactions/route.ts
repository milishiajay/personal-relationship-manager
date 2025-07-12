
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const contactId = searchParams.get('contactId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {}
    if (contactId) {
      where.contactId = contactId
    }

    const interactions = await prisma.interaction.findMany({
      where,
      orderBy: { date: 'desc' },
      take: limit,
      skip: offset,
      include: {
        contact: true
      }
    })

    return NextResponse.json(interactions)
  } catch (error) {
    console.error('Error fetching interactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch interactions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const interaction = await prisma.interaction.create({
      data: {
        contactId: body.contactId,
        date: new Date(body.date),
        medium: body.medium,
        title: body.title,
        notes: body.notes,
        duration: body.duration,
        location: body.location
      },
      include: {
        contact: true
      }
    })

    return NextResponse.json(interaction, { status: 201 })
  } catch (error) {
    console.error('Error creating interaction:', error)
    return NextResponse.json(
      { error: 'Failed to create interaction' },
      { status: 500 }
    )
  }
}