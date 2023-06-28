import commentsCounter from '../src/modules/commentcounter.js';

// Mock the document and div element for testing
document.body.innerHTML = `
<div class="col-md-12" id="commentList">
<p class="bold-text text-center usercomments">2023-06-28 a: great</p>
<p class="bold-text text-center usercomments">2023-06-28 d: nice</p>
<p class="bold-text text-center usercomments">2023-06-26 Mahadi: it is good to watch</p>
<p class="bold-text text-center usercomments">2023-06-25 Kamran: good one</p>
</div>
`;

describe('showsCounter', () => {
  it('should return the correct count of child elements in showsList div', () => {
    const result = commentsCounter();
    expect(result).toBe(4);
  });
});