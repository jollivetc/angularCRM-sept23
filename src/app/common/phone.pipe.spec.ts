import { PhonePipe } from './phone.pipe';

describe('PhonePipe', () => {
  it('create an instance', () => {
    const pipe = new PhonePipe();
    expect(pipe).toBeTruthy();
  });

  it('should work',()=>{
    const pipe = new PhonePipe();
    expect(pipe.transform('0123456')).toEqual('01 23 45 6');
  })
});
