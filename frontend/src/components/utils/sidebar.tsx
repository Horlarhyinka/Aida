import { VStack, Image, Box } from "@chakra-ui/react"
import Logo from '../../assets/img/Logo.png'
import documentationNavIcn from '../../assets/svg/nav/documentation.svg'
import emergencyNavIcn from '../../assets/svg/nav/emergencies.svg'
import learningNavIcn from '../../assets/svg/nav/learning.svg'
import rewardsNavIcn from '../../assets/svg/nav/reward.svg'
import MenuItem from "./menu-item"
import settingsNavIcn from '../../assets/svg/nav/setting.svg'
import helpNavIcn from '../../assets/svg/nav/help.svg'
import reportNavIcn from '../../assets/svg/nav/report.svg'
import NavProfile from "./nav-profile"


const SideBar = () =>{

    const nav_itemsA = [
        {label: 'Emergencies', path: '/dashboard', icon: emergencyNavIcn},
        {label: 'Learning', path: '/learning', icon: learningNavIcn},
        {label: 'Rewards', path: '/rewards', icon: rewardsNavIcn},
        {label: 'Documentation', path: '/documentation', icon: documentationNavIcn}
    ]

    const nav_itemsB = [
        {label: 'Settings', path: '/setting', icon: settingsNavIcn},
        {label: 'Help center', path: '/help', icon: helpNavIcn},
        {label: 'Report', path: '/report', icon: reportNavIcn}
    ]

    const rawUser = localStorage.getItem("user")
    const user = JSON.parse(rawUser!)
    return <VStack bg={'white'} spacing={'184px'} align={'left'} w='350px' h='100vh' py='48px' borderRight={'4px solid #2196F31A'} pos={'fixed'} >
        <VStack spacing={'48px'} align={'left'} >
            <Box w='100%' textAlign={'left'} >
        <Image display={'inline'} alignSelf={'flex-start'} src={Logo} alt={'logo'} />
            </Box>
            <VStack spacing={'24px'} alignItems={'flex-start'} textAlign={'left'} align={'left'} >
                {
                    nav_itemsA.map((item, i)=><MenuItem 
                    path={item.path} 
                    label={item.label} 
                    key={i} 
                    icon={item.icon}
                    px='40px'
                    // py='0px'
                    spacing={'12px'}

                     />)
                }
            </VStack>
        </VStack>
        <VStack  spacing={'24px'} alignItems={'flex-start'} textAlign={'left'} align={'left'}  >
        {
                    nav_itemsB.map((item, i)=><MenuItem 
                    path={item.path} 
                    label={item.label} 
                    key={i} 
                    icon={item.icon}
                    px='40px'
                    py='8px'
                    spacing={'12px'}
                     />)
                }
            <NavProfile 
            name={user.lastName + " " + user.firstName} 
            avatar={user.avatar} 
            userId={user._id} 
            skill={user.skill}
            w='100%'

             />
        </VStack>
    </VStack>
}

export default SideBar