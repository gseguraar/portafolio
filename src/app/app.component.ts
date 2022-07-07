import { Component } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

interface TechNode {
  name: string;
  children?: TechNode[];
}

const TREE_DATA: TechNode[] = [
  {
    name: 'BACKEND/SERVER SIDE',
    children: [
      {name:'JAVA'},
      {name:'PHP'}, {name:'APACHE TOMCAT'},
      {
        name: 'FRAMEWORKS',
        children: [{name:'SPRING'},{name:'SPRING JDBC'},{name:'SPRING BOOT'},{name:'HIBERNATE'},],
      },
      {
        name: 'RDMS',
        children: [{name: 'MYSQL'}, {name: 'IBM DB2'}, {name:'ORACLE DATABASE'}, {name:'MICROSOFT SQL SERVER'}],
      },
      {
        name: 'BUILD TOOLS',
        children: [{name: 'GRADLE'}, {name: 'MAVEN'}, {name:'ORACLE DATABASE'}, {name:'MICROSOFT SQL SERVER'}],
      },
    ],
  },
  {
    name: 'FRONTEND',
    children: [
      {name:'JAVASCRIPT'},{name:'HTML'},{name:'CSS'},{name:'SCSS'},{name:'TYPESCRIPT'},{name:'NODE.JS'},{name:'AJAX'},
      {
        name: 'FRAMEWORKS',
        children: [{name: 'JQUERY'}, {name: 'ANGULAR.JS'},{name: 'BOOTSTRAP'},{name: 'VUEJS'},{name:'KENDOUI'}],
      },
      {
        name: 'PACKAGE MANAGER',
        children: [{name: 'YARN'}, {name: 'NPM'},{name: 'BOWER'},{name: 'JSPM'},],
      },
      {
        name: 'NOSQL',
        children: [{name: 'MONGODB'}],
      },
    ],
  },
  {
    name: 'MOBILE',
    children: [
      {name:'SWIFT'},{name:'ANDROID'},{name:'IONIC'},
    ],
  },
  {
    name: 'CMS',
    children: [
      {name:'WORDPRESS'},{name:'DRUPAL'},
    ],
  },

  
];


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'portafolio';
  private _transformer = (node: TechNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  
}