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


export default async function Team() {
    const session = await getServerSession()
    if (!session) {
        redirect('/signin')
    }
    return (
        <div className="min-h-screen bg-[#FAF7F2] text-black">
            <div className="mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 pt-30 mb-2">
                        Meet the Team
                    </h1>
                </div>

                <div className="flex w-full items-center  justify-center gap-5 flex-wrap">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="bg-[#FFFCFB] rounded-lg border-2 border-[#B0BEC5] p-6 flex flex-col items-center min-h-75 max-w-60 flex-shrink-0"
                        >
                            <div className="h-20 w-20 flex items-center justify-center mb-4">
                                <img
                                    src="/userProfile.svg"
                                    alt="User Profile"
                                    className="w-20 h-20"
                                />
                            </div>
                            <h3 className="text-center text-sm font-medium text-[#2A1D19] mb-1">
                                {member.name}
                            </h3>

                            <p className="text-center text-xs font-medium text-[#2A1D19] mb-3">
                                {member.role}
                            </p>
                            <p className="text-center text-xs text-[#2A1D19] leading-relaxed">
                                {member.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}
