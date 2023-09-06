const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

const notes = [
    {
        title:'bank',
        text:'deposit cash',
        id: uuid()
    },
    {
        title:'store',
        text:'pickup supplies',
        id: uuid()
    }
];
module.exports = notes;