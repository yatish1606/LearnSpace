import userImage from '../assets/user.png'
import userImage2 from '../assets/user2.png'
import userImage3 from '../assets/user3.png'
import userImage4 from '../assets/user4.png'

export const getRandomUser = () => {
    let users = [userImage]
    return users[Math.floor(Math.random() * users.length)]
}

export const getRandomUser2 = () => {
    let users = [userImage, userImage2, userImage3, userImage4]
    return users[Math.floor(Math.random() * users.length)]
}

export const getRandomColor = () => {
    // grey, blue, greenish, balckish, cyanish, blueish
    let colors = ['#888888', '#3F94BB', '#4EB753', '#6A6A6A', '#46B885','#4175C3']
    return colors[Math.floor(Math.random() * colors.length)]
}