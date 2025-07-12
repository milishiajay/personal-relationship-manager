
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const upcoming = searchParams.get('upcoming') === 'true'
    const completed = searchParams.get('completed') === 'true'

    const where: any = {}

    if (upcoming) {
      where.isCompleted = false
      where.dueDate = {
        gte: new Date(),
        lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // Next 30 days
      }
    }

    if (completed !== undefined) {
      where.isCompleted = completed
    }

    const reminders = await prisma.reminder.findMany({
      where,
      orderBy: { dueDate: 'asc' },
      include: {
        contact: true
      }
    })

    return NextResponse.json(reminders)
  } catch (error) {
    console.error('Error fetching reminders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reminders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const reminder = await prisma.reminder.create({
      data: {
        contactId: body.contactId,
        type: body.type,
        title: body.title,
        message: body.message,
        dueDate: new Date(body.dueDate),
        isRecurring: body.isRecurring || false,
        recurringPattern: body.recurringPattern
      },
      include: {
        contact: true
      }
    })

    return NextResponse.json(reminder, { status: 201 })
  } catch (error) {
    console.error('Error creating reminder:', error)
    return NextResponse.json(
      { error: 'Failed to create reminder' },
      { status: 500 }
    )
  }
}