import { Component } from '@angular/core';
import { IPost } from '../../interfaces/post.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  posts: IPost[] = [
    {
      id: '1',
      title: 'Новый воск для контейнерных свечей',
      smallDescription:
        'Расскажем о том, с чего начать знакомство с воском, как выбрать свой соевый воск, чем отличаются разные его виды и какие конкретно марки могут подойти для ваших целей',
      description:
        'Новый воск для контейнерных свечей обладает более низкой точкой плавления, то есть такой воск начинает плавиться при меньшей температуре, чем воск для формовых свечей.',
      image: './assets/images/bg.png',
      date: '2023-11-11',
      author: 'Dmitry',
    },
    {
      id: '2',
      title: 'Новый воск для контейнерных свечей',
      smallDescription:
        'Расскажем о том, с чего начать знакомство с воском, как выбрать свой соевый воск, чем отличаются разные его виды и какие конкретно марки могут подойти для ваших целей',
      description:
        'Новый воск для контейнерных свечей обладает более низкой точкой плавления, то есть такой воск начинает плавиться при меньшей температуре, чем воск для формовых свечей.',
      image: './assets/images/card.png',
      date: '2023-11-11',
      author: 'Dmitry',
    },
    {
      id: '3',
      title: 'Новый воск для контейнерных свечей',
      smallDescription:
        'Расскажем о том, с чего начать знакомство с воском, как выбрать свой соевый воск, чем отличаются разные его виды и какие конкретно марки могут подойти для ваших целей',
      description:
        'Новый воск для контейнерных свечей обладает более низкой точкой плавления, то есть такой воск начинает плавиться при меньшей температуре, чем воск для формовых свечей.',
      image: './assets/images/bg.png',
      date: '2023-11-11',
      author: 'Dmitry',
    },
    {
      id: '4',
      title: 'Новый воск для контейнерных свечей',
      smallDescription:
        'Расскажем о том, с чего начать знакомство с воском, как выбрать свой соевый воск, чем отличаются разные его виды и какие конкретно марки могут подойти для ваших целей',
      description:
        'Новый воск для контейнерных свечей обладает более низкой точкой плавления, то есть такой воск начинает плавиться при меньшей температуре, чем воск для формовых свечей.',
      image: './assets/images/bg.png',
      date: '2023-11-11',
      author: 'Dmitry',
    },
  ];
}
