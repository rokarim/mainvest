
/*
  The following classes are a representation of the logic for the Waitlist Rank.

  When a user signs up using a referral link, an score is added to the user that owns the link.

  The Rank Score is calculated taking in account the date of the score. The difference between the date of the score
  and the current date affects the score by calculating it as a porcentage.

*/

class User {
  constructor (userName, password) {
    this.userName = userName
    this.password = password
    this.referalLink = this.generateReferalLink()
    this.rankScores = []
    this.signUpDate = Date.now()
  }

  generateReferalLink () {
    return URL+'?ref=''+this.userName
  }

  // Returns the average score of the user taking in account the date of the score
  // The period of time passed since the referral was stored affects the score comparing it with
  // the current time.
  getRankScore () {
    let avg = 0
    for (let i=0; i<this.rankScore.length; i++) {
      avg += this.rankScore[i].value * (1 - ((Date.now() - this.scores[i].time))/Date.now())
    }
    return avg
  }

  addRankScore () {
    this.rankScore.push(new Score(100))
  }
}

class Score {
  constructor(value){
    this.value = value
    this.time = Date.now()
  }
}

class WaitlistRank {
  constructor(){
    this.board = {}
  }

  addToWaitlistRank(userName) {
    if (!this.board[userName]) {
      this.board[userName] = 0
    }
  }

  // This is an abstraction of the API's endpoint
  // It returns the list of users and their positions on the Rank sorted descendant
  // returns [[user, userScore]...]
  getWaitlistRank() {
    let sortedRank = []
    for (let user in this.board) {
      sortedRank.push([user, this.board[user].getRankScore()])
    }
    return sortedRank.sort((a, b) => b[1] - a[1])
  }
}

class App {
  constructor(){
    this.waitlistRank = new WaitlistRank()
  }

  // This is an abstraction of the API's endpoint
  signUp (userName, password, referralParam) {
    if (!this.waitlistRank[userName]) {
      this.joinWaitlistRank(userName) = new User(username, password)
      if (referralParam) addRankScore(referralParam)
    }
  }

  joinWaitlistRank(userName) {
    this.waitlistRank.addToWaitlistRank(userName)
  }

  // It will be executed when a user sign up using a referral link
  // the username will be a param taken from the url
  updateUserRank (username) {
    this.waitlistRank[username].updateRankScore()
  }
}
