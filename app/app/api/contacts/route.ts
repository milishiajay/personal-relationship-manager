
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const tags = searchParams.get('tags')?.split(',').filter(Boolean)
    const groups = searchParams.get('groups')?.split(',').filter(Boolean)

    const where: any = {}

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { nickname: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (tags && tags.length > 0) {
      where.contactTags = {
        some: {
          tag: {
            name: { in: tags }
          }
        }
      }
    }

    if (groups && groups.length > 0) {
      where.groupMemberships = {
        some: {
          group: {
            name: { in: groups }
          }
        }
      }
    }

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { firstName: 'asc' },
      include: {
        interactions: {
          orderBy: { date: 'desc' },
          take: 1
        },
        contactTags: {
          include: { tag: true }
        },
        groupMemberships: {
          include: { group: true }
        }
      }
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const contact = await prisma.contact.create({
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

    // Handle custom fields
    if (body.customFields && body.customFields.length > 0) {
      await prisma.customField.createMany({
        data: body.customFields.map((field: any) => ({
          contactId: contact.id,
          fieldName: field.fieldName,
          fieldValue: field.fieldValue
        }))
      })
    }

    // Handle emergency contacts
    if (body.emergencyContacts && body.emergencyContacts.length > 0) {
      await prisma.emergencyContact.createMany({
        data: body.emergencyContacts.map((emergency: any) => ({
          contactId: contact.id,
          name: emergency.name,
          relationship: emergency.relationship,
          phone: emergency.phone,
          email: emergency.email
        }))
      })
    }

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    )
  }
}