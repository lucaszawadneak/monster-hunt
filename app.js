new Vue({
  el: "#app",
  data: {
    gameOnCourse: false,
    playerHP: 100,
    monsterHP: 100,
    battleLog: [],
    specialAttacks: 5,
  },
  computed: {
    playerDanger() {
      return this.playerHP <= 20;
    },
    monsterDanger() {
      return this.monsterHP <= 20;
    },
    victory() {
      return this.monsterHP <= 0 && !this.defeat;
    },
    defeat() {
      return this.playerHP <= 0;
    },
  },
  methods: {
    handleAttack() {
      if (!this.victory && !this.defeat) {
        console.log("⚔ Atacou");
        this.monsterHP -= Math.floor(Math.random() * 6) + 2;
        this.playerHP -= Math.floor(Math.random() * 7) + 4;
      }
    },
    handleSpecialAttack() {
      if (!this.victory && !this.defeat && this.specialAttacks >= 1) {
        console.log("⚔ ATAQUE ESPECIAL");
        this.specialAttacks--;
        this.monsterHP -= Math.floor(Math.random() * 15) + 2;
        this.playerHP -= Math.floor(Math.random() * 7) + 1;
      }
    },
    startGame() {
      this.monsterHP = 100;
      this.playerHP = 100;
      this.battleLog = [];
      this.specialAttacks = 5;
      this.gameOnCourse = !this.gameOnCourse;
    },
    heal() {
      if (!this.victory && !this.defeat) {
        console.log("⚔ DESCANSOU");
        if (this.monsterHP < 100) {
          this.monsterHP += Math.floor(Math.random() * 5) + 1;
        }
        if (this.playerHP < 100) {
          this.playerHP += Math.floor(Math.random() * 7) + 4;
        }
      }
    },
  },
  watch: {
    monsterHP(previus, current) {
      const value = (previus - current) * -1;
      if (this.gameOnCourse && value > 0) {
        this.battleLog.unshift({
          message: `JOGADOR ATINGIU O MONSTRO COM ${value}`,
          id: previus,
          type: true,
        });
      }
    },
    playerHP(previus, current) {
      const value = (previus - current) * -1;
      if (this.gameOnCourse && value > 0) {
        this.battleLog.unshift({
          message: `MONSTRO ATINGIU O JOGADOR COM ${value}`,
          id: previus,
          type: false,
        });
      }
    },
    victory(_, current) {
      if (current) {
        this.gameOnCourse = false;
      }
    },
    defeatz(_, current) {
      if (current) {
        this.gameOnCourse = false;
      }
    },
  },
});
