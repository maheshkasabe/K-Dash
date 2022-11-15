import renderer from 'react-test-renderer';
import React from 'react'
import { useState } from 'react'
import { screen } from "@testing-library/react"

import { FaNetworkWired } from 'react-icons/fa';
import {MdStorage} from 'react-icons/md';
import {TbFileSettings} from 'react-icons/tb';
import {MdRemoveRedEye} from 'react-icons/md';
import {GrStackOverflow} from 'react-icons/gr';
import {MdEmojiEvents} from 'react-icons/md';
import Home from './Home';

jest.mock("./home.css");
jest.mock('react-icons/fa');
jest.mock('react-icons/md');
jest.mock('react-icons/tb');
jest.mock('react-icons/md');
jest.mock('react-icons/gr');
jest.mock('react-icons/md');

const renderTree = tree => renderer.create(tree);
describe('<Home>', () => {
  it('should render component', () => {
    expect(renderTree(<Home />))
  });

  test('should render k-dash', () => {
    expect(screen.getByText('K-Dash'));
  })
  
});