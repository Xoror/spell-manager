const sortAlphabetically = (a:string, b:string) => {
    const name1 = a.toLowerCase()
    const name2 = b.toLowerCase()
    if (name1 < name2) {
        return -1
    }
    if (name1 > name2) {
        return 1
    }
    return 0
}

export default sortAlphabetically