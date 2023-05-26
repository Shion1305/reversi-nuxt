<script lang="ts" setup>
import axios from 'axios'

const user = await useLogin().getCurrentUser()
const myID = user!!.userID

const recordsData: {
  records: Result[]
  wins: number
  loses: number
  draws: number
  giveups: number
} | null = await axios
  .get('/api/record/get-record')
  .then((res) => {
    if (!res.data.records) {
      console.log('invalid response')
      return null
    }
    return {
      records: res.data.records as Result[],
      wins: res.data.wins as number,
      loses: res.data.loses as number,
      draws: res.data.draws as number,
      giveups: res.data.giveups as number
    }
  })
  .catch((error) => {
    return null
  })

const opponentName = async (record: Result) => {
  let opponentID
  if (record.black_user == myID) {
    opponentID = record.white_user
  } else {
    opponentID = record.black_user
  }
  const username = await axios
    .get('/api/user/get-name?targetUser=' + opponentID)
    .then((res) => {
      console.log(res.data.name)
      return res.data.name as string
    })
  console.log(username)
  return username
}

const recordsTable: {
  opponentName: string
  result: string
  userDiscNum: number
  opponentDiscNum: number
}[] = []
if (recordsData?.records) {
  console.log(recordsData.records)
  for (let i = 0; i < recordsData.records.length; i++) {
    recordsTable.push({
      opponentName: await opponentName(recordsData.records[i]),
      result:
        recordsData.records[i].winner === myID
          ? '勝ち'
          : recordsData.records[i].winner === 'draw'
          ? '引き分け'
          : '負け',
      userDiscNum:
        recordsData.records[i].black_user === myID
          ? recordsData.records[i].black_num
          : recordsData.records[i].white_num,
      opponentDiscNum:
        recordsData.records[i].black_user !== myID
          ? recordsData.records[i].black_num
          : recordsData.records[i].white_num
    })
  }
}
const opponentsPerData: {
  opponentName: string
  wins: number
  loses: number
  draws: number
}[] = []

if (recordsData?.records) {
  for (let i = 0; i < recordsData.records.length; i++) {
    const oName = await opponentName(recordsData.records[i])
    let opponentData = opponentsPerData.find(
      (opponent) => opponent.opponentName === oName
    )
    if (!opponentData) {
      opponentData = {
        opponentName: oName,
        wins: 0,
        loses: 0,
        draws: 0
      }
      opponentsPerData.push(opponentData)
    }
    if (recordsData.records[i].winner === myID) {
      opponentData.wins++
    } else if (recordsData.records[i].winner === 'draw') {
      opponentData.draws++
    } else {
      opponentData.loses++
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="result">
      <div class="g1">
        <img height="300" src="@/assets/imgs/leaf.png" width="700" />
      </div>
      <div class="g2">
        <h1>通算戦績</h1>
        <div>勝ち:{{ recordsData?.wins }}</div>
        <div>負け:{{ recordsData?.loses }}</div>
        <div>引き分け:{{ recordsData?.draws }}</div>
        <div>(負け うち投了:{{ recordsData?.giveups }})</div>
      </div>
    </div>

    <div class="table">
      <table bgcolor="#90ee90" border="1" height="150" width="500">
        <tr height="20">
          <th>名前</th>
          <th>勝敗</th>
          <th>自分</th>
          <th>相手</th>
        </tr>

        <tr v-for="r in recordsTable as any[]" height="40">
          <td>{{ r.opponentName }}</td>
          <td>{{ r.result }}</td>
          <td>{{ r.userDiscNum }}</td>
          <td>{{ r.opponentDiscNum }}</td>
        </tr>
      </table>
    </div>
    <div class="table2">
      <table bgcolor="#90ee90" border="1" height="150" width="625">
        <tr height="20">
          <th>名前</th>
          <th>勝ち</th>
          <th>負け</th>
          <th>引分</th>
          <th>投了</th>
        </tr>

        <tr v-for="d in opponentsPerData" height="40">
          <td>{{ d.opponentName }}</td>
          <td>{{ d.wins }}</td>
          <td>{{ d.loses }}</td>
          <td>{{ d.draws }}</td>
          <td>0</td>
        </tr>
      </table>
    </div>
    <div class="m1">
      <p><font size="5">過去の戦績</font></p>
    </div>
    <div class="m2">
      <p><font size="5">相手毎の通算戦績</font></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.g1 {
  position: relative;
}

.g2 {
  position: absolute;
  font-size: 35px;

  h1 {
    margin: 30px 0 0;
  }
}

.result {
  display: flex;
  justify-content: center;
}

.table {
  position: absolute;

  bottom: 50px;
  overflow-y: scroll;
  width: 517px;
  height: 150px;
}

.table2 {
  position: absolute;
  right: 0;
  bottom: 50px;
  overflow-y: scroll;
  width: 642px;
  height: 150px;
}

.table th {
  background: forestgreen;
  position: sticky;
  top: 0;
  left: 0;
}

.table2 th {
  background: forestgreen;
  position: sticky;
  top: 0;
  left: 0;
}

.m1 {
  position: absolute;
  bottom: 180px;
}

.m2 {
  position: absolute;
  right: 0;
  bottom: 180px;
}
</style>
