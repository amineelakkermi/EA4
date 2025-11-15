import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import User from '@/database/user.model'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json(
        { message: 'Admin already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      name: 'Admin',
      email,
      password: hashedPassword,
      role: 'admin',
    })

    return NextResponse.json(
      { message: 'Admin created', email },
      { status: 201 }
    )
  } catch (error) {
    console.error('Seed admin error:', error)
    return NextResponse.json(
      { message: 'Error creating admin' },
      { status: 500 }
    )
  }
}