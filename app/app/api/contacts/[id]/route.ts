
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: params.id },
      include: {
        interactions: {
          orderBy: { date: 'desc' }
        },
        customFields: true,
        emergencyContacts: true,
        contactTags: {
          include: { tag: true }
        },
        groupMemberships: {
          include: { group: true }
        },
        albumShares: {
          include: {
            album: {
              include: {
                media: true
              }
            }
          }
        },
        reminders: {
          where: { isCompleted: false },
          orderBy: { dueDate: 'asc' }
        }
      }
    })

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Error fetching contact:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const contact = await prisma.contact.update({
      where: { id: params.id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        nickname: body.nickname,
        email: body.email,
        phone: body.phone,
        birthday: body.birthday ? new Date(body.birthday) : null,
        location: body.location,
        notes: body.notes,
        profilePhoto: body.profilePhoto,
        relationshipType: body.relationshipType,
        bloodGroup: body.bloodGroup,
        medicalConditions: body.medicalConditions,
        allergies: body.allergies
      }
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contact.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting contact:', error)
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    )
  }
}