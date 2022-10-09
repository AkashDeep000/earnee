import pb from "../pb/index.js"
import dateDiff from "date-diff"
const DateDiff = dateDiff.default

const userDetails = async (profileId) => {
  if (!profileId) {
    throw new Error("profileId required")
  }
  const profile = await pb.records.getOne('profiles', profileId, {
    expand: "refers, refers.referedTo, refers.referedTo.refers"
  });
  const withdraws = await pb.records.getFullList('withdraws', 9e18, {
    filter: `profile="j8crwhiv59k931r" && errorMessage=""`,
  });
  //console.log(profile)


  let totalDeposit = 0
  let totalWithdraw = 0
  let teamMember = 0
  let weekDeposit = 0
  let weekTeamMember = 0
  let monthDeposit = 0
  let monthTeamMember = 0

  for (var i = 0; i < profile["@expand"]?.refers.length; i++) {
    const refer = profile["@expand"].refers[i]
    totalDeposit += refer.commission1 || 0
    teamMember ++
    //7day
    const currentDate = new Date()
    const referDate = new Date(refer.updated)
    const diff = new DateDiff(currentDate, referDate)
    if (diff.weeks() <= 1) {
      weekDeposit += refer.commission1 || 0
      if (refer.commission1) {
        weekTeamMember ++
      }
    }
    if (diff.months() <= 1) {
      monthDeposit += refer.commission1 || 0
      if (refer.commission1) {
        monthTeamMember ++
      }
    }

    //level 2 loop
    for (var j = 0; j < refer["@expand"].referedTo["@expand"]?.refers.length; j++) {
      const refer2 = refer["@expand"].referedTo["@expand"].refers[j]
      totalDeposit += refer2.commission2 || 0
      teamMember ++
      //months
      const currentDate = new Date()
      const referDate = new Date(refer2.updated)
      const diff = new DateDiff(currentDate, referDate)
      if (diff.weeks() <= 1) {
        weekDeposit += refer2.commission2 || 0
        if (refer2.commission2) {
          weekTeamMember ++
        }
      }
      if (diff.months() <= 1) {
        monthDeposit += refer2.commission2 || 0
        if (refer2.commission2) {
          monthTeamMember ++
        }
      }
    }
  }

  for (var k = 0; k < withdraws.length; k++) {
    const withdraw = withdraws[k]
    totalWithdraw += withdraw.amount
  }
  const balance = totalDeposit - totalWithdraw

  const data = {
    balance,
    totalDeposit,
    totalWithdraw,
    weekTeamMember,
    weekDeposit,
    monthTeamMember,
    monthDeposit,
    teamMember,
  }
  return data
}

export default userDetails