import showsCounter from '../src/modules/showsCounter.js';

describe('Homepage Counter', () => {
  const taskList = [
    {
      id: 1,
      url: 'https:',
      name: 'Kamran',
    },
    {
      id: 2,
      url: 'https:',
      name: 'Kamran',
    },
    {
      id: 3,
      url: 'https:',
      name: 'Kamran',
    },
    {
      id: 4,
      url: 'https:',
      name: 'Kamran',
    },
    {
      id: 5,
      url: 'https:',
      name: 'Kamran',
    },
  ];
  it('should return count of the Shows List on the Home page', () => {
    expect(showsCounter(taskList)).toEqual(5);
  });
});