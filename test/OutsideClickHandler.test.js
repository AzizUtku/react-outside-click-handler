import React from 'react';
import {shallow, configure, mount, render} from 'enzyme';
import OutsideClickHandler from '../src/OutsideClickHandler';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Should render OutsideClickHandler correctly', () => {

  it('renders without crashing with outer div', () => {
    const wrapper = mount(
      <OutsideClickHandler onOutsideClick={() => {}}>Test</OutsideClickHandler>
    );
    expect(wrapper.find('div').length).toBe(1);
  });

  it('renders without crashing and outer div with targetRef', () => {
    const wrapper = mount(
      <OutsideClickHandler
        targetElement={(ref) => {
        return (<p ref={ref}/>);
      }}
        onOutsideClick={() => {}}>Test</OutsideClickHandler>
    );
    expect(wrapper.find('div').length).toBe(0);
  });

  describe('should render its children', () => {
    it('renders its child without targetRef', () => {
      const wrapper = mount(
        <OutsideClickHandler onOutsideClick={() => {}}>
          <p></p>
        </OutsideClickHandler>
      );
      expect(wrapper.find('p').length).toBe(1);
    });

    it('renders its child with targetRef', () => {
      const wrapper = mount(
        <OutsideClickHandler
          targetElement={(ref) => {
          return (<p ref={ref}/>);
        }}
          onOutsideClick={() => {}}>Test</OutsideClickHandler>
      );
      expect(wrapper.find('p').length).toBe(1);
    });
  })

});

describe('onOutsideClick', () => {
  let instance;
  let onOutsideClick;
  let wrapper;
  beforeEach(() => {
    onOutsideClick = jest.fn();
    wrapper = mount(
      <OutsideClickHandler onOutsideClick={onOutsideClick}>Test</OutsideClickHandler>
    );
    instance = wrapper.instance();
  });

  describe('With internal logic', () => {
    it('triggers function', () => {
      instance.outsideClickHandler();
      expect(onOutsideClick).toHaveBeenCalled();
    });
  
    it('should not trigger function', () => {
      instance.insideClickHandler();
      instance.outsideClickHandler();
  
      expect(onOutsideClick).not.toHaveBeenCalled();
    });
  })

  describe('With simulating DOM click', () => {
    it('triggers function', () => {
      const div = global.document.createElement('div');
      global.document.body.appendChild(div);

      const wrapper = mount(
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
        Test
      </OutsideClickHandler>, {attachTo: div});

      var evt = global.document.createEvent("HTMLEvents");
      evt.initEvent("click", false, true);
      global.document.dispatchEvent(evt)

      expect(onOutsideClick).toHaveBeenCalled();
    });
  
    it('should not trigger function', () => {
      const wrapper = mount(
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
        Test
      </OutsideClickHandler>);
      
      wrapper.simulate('click');
      expect(onOutsideClick).not.toHaveBeenCalled();
    });
  })

  
});

describe('Should work closeable functionality properly', () => {

  let onOutsideClick;
  beforeEach(() => {
    onOutsideClick = jest.fn();
    document.body.innerHTML = '';
  });

  it('should be closed by itself', () => {
    const wrapper = mount(
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
      Test
    </OutsideClickHandler>, {attachTo: document.body});

    expect(document.body.childNodes.length).toBe(1);
    expect(wrapper.state("isVisible")).toBeTruthy();

    document.body.click();

    expect(document.body.childNodes.length).toBe(0);
    expect(wrapper.state("isVisible")).toBeFalsy();
  });

  it('should not be closed by itself', () => {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    expect(div.childNodes.length).toBe(0);

    const wrapper = mount(
      <OutsideClickHandler onOutsideClick={onOutsideClick} closeable={false}>
      Test
    </OutsideClickHandler>, {attachTo: div});

    expect(div.childNodes.length).toBe(1);
    expect(wrapper.state("isVisible")).toBeTruthy();

    var evt = global.document.createEvent("HTMLEvents");
    evt.initEvent("click", false, true);
    global.document.dispatchEvent(evt)

    expect(div.childNodes.length).toBe(1);
    expect(wrapper.state("isVisible")).toBeTruthy();
    wrapper.detach();
  });
});

describe('Should add/remove event listeners', () => {
  it('adds event listener', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    document.addEventListener = jest.fn();

    mount(<OutsideClickHandler onOutsideClick={() => {}}/>, {attachTo: div});
    expect(document.addEventListener).toHaveBeenCalledTimes(1);
  });

  it('removes event listener', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    let addedListener = {};
    document.addEventListener = jest.fn((event, cb, useCapture) => {
      addedListener = {
        event,
        cb,
        useCapture
      }
    });

    document.removeEventListener = jest.fn();

    const wrapper = mount(<OutsideClickHandler onOutsideClick={() => {}}/>, {attachTo: div});
    wrapper.unmount();
    expect(document.removeEventListener).toHaveBeenCalledTimes(1);
    expect(document.removeEventListener).toHaveBeenCalledWith(addedListener.event, addedListener.cb, addedListener.useCapture);
  });
});