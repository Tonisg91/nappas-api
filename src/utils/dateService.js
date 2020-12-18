class DateService {
    constructor() {
        this.date = new Date
        this.day = this.date.getDate()
        this.month = this.date.getMonth() + 1
        this.year = this.date.getFullYear()
    }

    twoDigits(date) {
        return date < 10 ? `0${date}` : `${date}`
    }

    fullDate() {
        return `${this.MM()}/${this.DD()}/${this.YYYY() + 1}`
    }

    MMDD() {
        return `${this.twoDigits(this.month)}${this.twoDigits(this.day)}`
    }

    MM() {
        return this.twoDigits(this.month)
    }

    DD() {
        return this.twoDigits(this.day)
    }

    YYYY() {
        return this.year
    }

}

module.exports = new DateService()