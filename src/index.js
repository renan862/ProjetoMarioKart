const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};
async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        //sortear um bloco
        let block = await getRandomBlock();
        console.log(`Boloco: ${block}`);
        

        //rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);

        }
        if (block === "CURVA") {
            totalTestSkill2 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);

        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER
            let powerResult2 = diceResult1 + character2.PODER

            console.log(`${character1.NOME} confrontrou com ${character2.NOME} 🥊`);
            await logRollResult(character1.PODER, "Poder", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.PODER, "Poder", diceResult2, character2.MANOBRABILIDADE);

            //Tabem posso fazer assim: character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS >0 ? 1 :0;

            if (powerResult1 > powerResult2 && character2.PONTOS>0) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);                
                character2.PONTOS--;
                
            }  
            //Tabem posso fazer assim: character1.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS >0 ? 1 :0;

            if (powerResult2 > powerResult1 && character1.PONTOS>0){
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                character1.PONTOS--;
                
            }
            //Tabem posso fazer assim: console.log(powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto foi perdido")
            if (powerResult1 === powerResult2){
                console.log("Confronto empatado! Nenhum ponto foi perdido")
            }

        }

        //verificando o vencedor
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou 1 ponto!`);
            character1.PONTOS++
            
        } else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou 1 ponto!`);
            character2.PONTOS++
            
        }
        console.log("______________________________________________________________")

        
    }

};

async function declareWinner(character1, character2) {
    console.log("Resutlado Final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n ${character1.NOME} venceu a corrida! 🏆`);

    }else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n ${character2.NOME} venceu a corrida! 🏆`);
        
    }else {
        console.log("A corrida terminou em empate")
    }
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começamdo...\n`);

    await playRaceEngine(player1, player2)
    await declareWinner (player1, player2)
})();

