# FrontEnd juniorCode challenge 3 - Pixel Arts

## Used technologies / Frameworks

I use the following technologies / frameworks in my project:

- Webpack
- Typescript
- HTML
- SCSS

* I'm using Webpack because it's easy to configure the project with all the dependencies, also it's really easy to add new packages for my app in case that I need it. 
* For this project I choose to use only typescript to build the functionality of my app, I like typescript because 
It is more restrictive than javascript (with the types, parameters, etc).

Im not using modern frameworks like Angular or React, I did this project like if I were using twig templates (because I'm been working with them the last two years) I'm using data attributes and css variables to share and send data from the html to my typescripts/scss files. 
## Used 3rd Party Libraries

I use the following 3rd party libraries in my project: (if none, remove the table and explain why)

Name | Reason
--- | ---
[dom-to-image](https://github.com/tsayen/dom-to-image) | To generate the image from the divElement
[FileSaver.js](https://github.com/eligrey/FileSaver.js/) | To save the image generated in my computer

I used these two packages to resolve my problem to generate an image from my divElement and save it in my computer,
also because it was easy to use them.

## Installation / Run
---
To run the project locally, enter the following in the command line / bash:

```console
$ git clone <linktorepository>
$ cd <repositoryname>
$ yarn install
$ yarn run start
```
---

## Notes / Description

The resources are inside of src directory, the structure is divided in:
 * components: Here we add the ts files for every functionality of our project, if we want to add a new 
   element/component in our project, we need to create the own directory for example testComponent and
   inside of it we create testComponent.ts, testComponent.scss, testComponent.spect.ts in case we want to 
   write tests.
   If we want to add components that it will be shared for example modalWindows, confirmScreen, etc, 
   we add the component inside of shared directory with the above structure.

* fonts: Here we add every font that we use in the project. The font of this project was created by iconmoon
* Images: Here we add the images that we want to add to the project
* scss: In this directory we add our scss that we share beetween all the components.

The idea of this is split the functionality in small parts and isolate them from anothers, for example if we
dont need colorsPaletteComponent anymore, we just need to delete that directory and remove the instance of the class
from the index.ts, the same case for the scss.

Our entry point is the index.ts file, here we add an instace of every component that we use in the project,
also here we defined our index.html.


