import showsCounter from '../src/modules/showsCounter.js';

// Mock the document and div element for testing
document.body.innerHTML = `
  <div id="showsList">
    <div class="show">Show 1</div>
    <div class="show">Show 2</div>
    <div class="show">Show 3</div>
  </div>
`;

describe('showsCounter', () => {
  it('should return the correct count of child elements in showsList div', () => {
    const result = showsCounter();
    expect(result).toBe(3);
  });
});