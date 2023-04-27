
const messageEl = document.querySelector(".message")
const confirmBtnsEl = document.querySelector(".confirmBtns")
const yesBtn = document.querySelector(".yesBtn")
const noBtn = document.querySelector(".noBtn")

const hisSumEl = document.querySelector(".hisSum")
const hisCardsEl = document.querySelector(".hisCards")

const imgContainer = document.querySelector(".img-container")
const vsImg = document.querySelector(".vs-img")
const winImg = document.querySelector(".win-img")
const loseImg = document.querySelector(".lose-img")

const myCardsEl = document.querySelector(".myCards")
const mySumEl = document.querySelector(".mySum")

const startBtn = document.querySelector(".startBtn")
const newCardBtn = document.querySelector(".newCardBtn")
const newGameBtn = document.querySelector(".newGameBtn")


const playerBetEl = document.querySelector(".playerBet")
const invalidBetAmounntEL = document.querySelector(".invalid-bet-amoun-message")
const tryAgainBtn = document.querySelector(".try-again-btn")

const chipsBtns = document.querySelectorAll(".chipsButtons button")
const betBtn = document.querySelector(".betBtn")

const playerTotalEl = document.querySelector(".playerTotal")
const noCreditLeftEl = document.querySelector(".no-credit-left")
const invalidCreditAmount = document.querySelector(".invalid-credit-amount")

const nameInput = document.querySelector("#nameInput")
const creditInput = document.querySelector("#creditInput")
const confirmBtn = document.querySelector(".confirmBtn")

const allBtns = document.querySelectorAll("button")

let player = {
    "name" : "",
    "credit" : 0,
}
let totalBet = 0
const chipArray = [5,10,20,50,100,200]
let available = []
let hisFirstCard,hisSecondCard,myFirstCard,mySecondCard,hisCards,myCards,randomCard,hisNewCard,myNewCard
let hisSum = 0
let mySum = 0
let hisCardsArray = []
let myCardsArray = []



    allBtns.forEach(function(button){
        button.disabled = true
    })


    creditInput.addEventListener("input",function(){
            confirmBtn.disabled = false
    })


    confirmBtn.addEventListener("click",getPlayerData)


    for(let i =0; i<chipArray.length; i++) {

        chipsBtns[i].addEventListener("click", function() {
            
            totalBet += chipArray[i]
            playerBetEl.textContent = `Bet : ${totalBet}$`


            if(totalBet > player.credit) {
                chipsBtns.forEach(function(chipBtn){
                    chipBtn.disabled=true
                })
                invalidBetAmounntEL.classList.remove("none")
                tryAgainBtn.classList.remove("none")
                tryAgainBtn.disabled = false
            }
        })
    }
    

    tryAgainBtn.addEventListener("click", function() {
        totalBet = 0
        chipsBtns.forEach(function(chipBtn){
            chipBtn.disabled = false
        })
        invalidBetAmounntEL.classList.add("none")
        tryAgainBtn.classList.add("none")
        playerBetEl.textContent = `Bet : 0`
    })


    betBtn.addEventListener("click", function() {
        player.credit -= totalBet
        playerTotalEl.textContent = `${player.name} : ${player.credit}$`

        chipsBtns.forEach(function(chipBtn) {
            chipBtn.disabled = true
        })

        startBtn.disabled = false
    })


    startBtn.addEventListener("click",startGame)


    yesBtn.addEventListener("click", function () {
        newCardBtn.disabled = false

        yesBtn.disabled=true
        noBtn.disabled=true
    })
    noBtn.addEventListener("click", function() {
    })


    newCardBtn.addEventListener("click",function() {
        hisCards = ""
        myCards = ""
        hisNewCard = randomCardGenerate()
        myNewCard = randomCardGenerate()

        hisCardsArray.push(hisNewCard)
        myCardsArray.push(myNewCard)

        hisCardsArray.forEach((cards)=>{
            hisCards += `${cards} / `
        })
        myCardsArray.forEach((cards)=>{
            myCards += `${cards} / `
        })

        renderGame()
    })


    newGameBtn.addEventListener("click",newGame)




function getPlayerData() {
    player.name += nameInput.value
    player.credit += parseInt(creditInput.value)

    available = [player.credit-5,player.credit-10,player.credit-20,player.credit-50,player.credit-100,player.credit-200]

    playerTotalEl.textContent = `${player.name} : ${player.credit}$`

    nameInput.value = ""
    creditInput.value = ""
    confirmBtn.disabled = true
    nameInput.disabled = true
    creditInput.disabled = true

    if(player.credit < 5) {
        chipsBtns.forEach(function(chipBtn) {
            chipBtn.disabled = true
        })
    } else {
        chipsBtns.forEach(function(chipBtn) {
            chipBtn.disabled = false
        })
    }
    

    for(let i=0;i<chipsBtns.length;i++) {

        if(player.credit < chipArray[i]) {
            invalidCreditAmount.classList.add("none")

        } 
        else if(player.credit < 5) {
            betBtn.disabled = true
            creditInput.disabled = false
            invalidCreditAmount.classList.remove("none")
        }
    }
    noCreditLeftEl.classList.add("none")
}

function randomCardGenerate() {

    randomCard = Math.floor(Math.random()*14) 

        if(randomCard === 0) {
            return 1
        } else if (randomCard > 11) {
            return 11
        } else {
            return randomCard
        }
}

function startGame() {
    hisFirstCard = randomCardGenerate()
    hisSecondCard = randomCardGenerate()
    myFirstCard = randomCardGenerate()
    mySecondCard = randomCardGenerate()

    hisCardsArray.push(hisFirstCard,hisSecondCard)
    myCardsArray.push(myFirstCard,mySecondCard)
    
    hisCards = `${hisFirstCard} / ${hisSecondCard}`
    myCards = `${myFirstCard} / ${mySecondCard}`

    startBtn.disabled = true

    imgContainer.style.animation = "spin 1s ease-in-out forwards running"

    renderGame()
}

function renderGame() {
    hisSum = 0
    mySum = 0
    hisCardsArray.forEach((card)=>{
        hisSum += card
    })
    myCardsArray.forEach((card)=>{
        mySum += card
    })

    hisSumEl.textContent = `Table : ${hisSum}`
    hisCardsEl.textContent = `Table : ${hisCards}`
    myCardsEl.textContent = `Cards : ${myCards}`
    mySumEl.textContent = `Me : ${mySum}`

    confirmBtnsEl.classList.add("visible")
    newCardBtn.disabled=true

    if(mySum < 21 && hisSum < 21) {
        messageEl.textContent = `Would you want a New Card ?`
        yesBtn.disabled = false
        noBtn.disabled = false
    } else if(mySum < 21 && hisSum === 21) {
        messageEl.textContent = `You got Blackjacked...`
        newGameBtn.disabled = false

        vsImg.classList.add("none")
        loseImg.classList.remove("none")
        loseImg.classList.add("block")
    }else if(mySum < 21 && hisSum > 21) {
        messageEl.textContent = `Table Lose..You Win...`
        newGameBtn.disabled = false

        vsImg.classList.add("none")
        winImg.classList.remove("none")
        winImg.classList.add("block")

        player.credit = player.credit + totalBet * 2
        playerTotalEl.textContent = `${player.name} : ${player.credit}$`
        totalBet = 0
    } else if(mySum === 21) {
        messageEl.textContent = `BlackJAck..You Win`
        newGameBtn.disabled = false

        vsImg.classList.add("none")
        winImg.classList.remove("none")
        winImg.classList.add("block")

        player.credit = player.credit + totalBet * 2
        playerTotalEl.textContent = `${player.name} : ${player.credit}$`
        totalBet = 0
    }else if(mySum > 21) {
        messageEl.textContent = `You lose...`
        newGameBtn.disabled = false

        vsImg.classList.add("none")
        loseImg.classList.remove("none")
        loseImg.classList.add("block")
    } 
    // TODO :   ikimiz birden 21'den büyük olunca DRAW olsun ve param GERİ verilsin
}

function newGame() {
    hisCardsArray =[]
    myCardsArray = []
    totalBet = 0
    available = [player.credit-5,player.credit-10,player.credit-20,player.credit-50,player.credit-100,player.credit-200]

    playerBetEl.textContent = `Bet : ${totalBet}$`

    vsImg.classList.remove("none")
    winImg.classList.add("none")
    loseImg.classList.add("none")

    newGameBtn.disabled=true
    chipsBtns.forEach((chipBtn)=>{
        chipBtn.disabled=false
    })

    if(player.credit < 5) {

        creditInput.disabled=false

        chipsBtns.forEach((chipBtn)=>{
            chipBtn.disabled = true
        })
        noCreditLeftEl.classList.remove("none")
    }
}