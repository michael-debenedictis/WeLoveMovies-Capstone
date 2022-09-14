function addCritic(reviewsArray, criticsArray) {
  return reviewsArray.map((item, index) => {
    criticId = item.critic_id;
    const matching = criticsArray.find((item) => {
      return item.critic_id === criticId;
    });
    return {
      ...item,
      critic: matching,
    };
  });
}

module.exports = addCritic