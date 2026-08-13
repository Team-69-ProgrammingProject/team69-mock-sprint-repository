import type { Metadata } from 'next'
import { getServerSession } from '@/actions/auth.actions'
import { redirect } from 'next/navigation'


interface TeamMember {
  id: number
  name: string
  role: string
  description: string
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: 'Vincent Nguyen',
        role: 'PM',
        description: 'Coordinate timelines, manage the team, and keep the project on track.',
    },
    {
        id: 2,
        name: 'Haidar Malik',
        role: 'BA',
        description: 'Define requirements, analyse stakeholder needs, and bridge business with tech.',
    },
    {
        id: 3,
        name: 'Jae Dwyer',
        role: 'UX',
        description: 'Design user flows, wireframes, and prototypes for intuitive experiences.'
    },
    {
        id: 4,
        name: 'Pema Tenzin',
        role: 'Dev 1',
        description: 'Build the solution, code, architecture, testing, and deployment.',
    },
    {
        id: 5,
        name: 'Michael Lew',
        role: 'Dev 2',
        description: 'Build the solution, code, architecture, testing, and deployment.',
    }
]


export default async function Team(){
  const session = await getServerSession()
  if (!session) {
    redirect('/signin')
  }

}
