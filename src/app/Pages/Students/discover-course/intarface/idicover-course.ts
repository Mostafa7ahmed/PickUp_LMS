export interface IDicoverCourse {
  id: number
  name: string
  description: string
  photo: string
  instructorDto: InstructorDto
  lessonsCount: number
  totalDuration: number
  rating: number
  price: number
  priceAfterDiscount: number
  topicName: string
  discount: Discount
}

export interface InstructorDto {
  id: number
  roleId: number
  name: string
  userName: string
  email: string
  phoneNumber: string
  photo: string
}

export interface Discount {
  amount: number
  type: number
}
