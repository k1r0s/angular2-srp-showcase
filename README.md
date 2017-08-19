### Aspect oriented programming example in Angular 2 - 4 -->

This is an example about separation of concerns in Angular applications. This example is quite simple and maybe cannot be a solution for complex problems. Learn more about https://en.wikipedia.org/wiki/Aspect-oriented_programming

This example is about removing infrastructure code from components by applying abstraction and modularity using AOP technique.

The following example is about a component that must contain a list of autors which have several posts, simple as that. There are hundreds of approaches but many of them do not apply separation of concerns and code readability.. and probably, if you have to repeat that process in different scenarios you will run duplication and code scattering problems.

>This example app is about kaop-ts capabilities. You should'nt see this as a genuine AOP example. Real world problems with **Cross Cutting Concerns** are harder than these... but, first of all you should know what tools exists against code repetition (CCC).

##### There we go:

## async calls

- create a component (AppComponent)
- describe a Pattern (Interface + Advice) of (component that must trigger an ajax request and receive a response)
- create an Interface called (ResourceContainer)
```typescript
export interface InitResourceContainer<M = any> {
  service: CommonRequest,
  servicePath?: string
  onResourceFulfit?(data?: M[]): void
}
```
- create behavior (Advice) called (ResourceContainerBehavior)
```typescript
export const ResourceContainerBehavior = beforeMethod<InitResourceContainer>(function(meta) {
  const resourcePromise = meta.scope.service.getResource(meta.args[0] || meta.scope.servicePath).toPromise()
  if (typeof meta.scope.onResourceFulfit === "function") {
    resourcePromise.then(meta.scope['onResourceFulfit'].bind(meta.scope))
  }
  resourcePromise.then((data) => {
    meta.args.push(data)
    this.next()
  })
})
```
- create a service that fits that behavior (service must fit Behavior rather than **component needs**)
- our component should implement InitResourceContainer
- then our ResourceContainerBehavior should be declared only at `ngOnInit` method which is defined as the only trigger for that action (customizable).

## dialog

- describe a pattern that dialog holders must implement
- create an interface called DialogHolder
```typescript
export interface DialogHolder {
  dialogFactory: MdDialog
  dialogRef: MdDialogRef<any>
  onDialogClose?(): void
}
```
- describe a Pattern for that components
```typescript
export const OpenDialogBehavior = (dialogComponent, errorDialogComponent = ErrorDialogComponent) => {
  return afterMethod<DialogHolder>(function(meta) {

    meta.scope.dialogRef = meta.scope.dialogFactory.open(
      meta.exception ? errorDialogComponent : dialogComponent,
      { data: meta.result }
    )

    if (typeof meta.scope.onDialogClose === "function") {
      meta.scope.dialogRef.afterClosed()
      .subscribe(meta.scope.onDialogClose.bind(meta.scope))
    }
  })
}
```
- our component should implement DialogHolder
- in this case any method can trigger OpenDialogBehavior so we need to decorate that method, that's all. Note that in the advice we check if `onDialogClose` is defined on annotated instance we subscribe that function.
- also if an exception is declared by another advice then errorDialogComponent will be rendered instead.

> There are more examples like 'method cache', 'loading-dialog', 'exception handling'.. more to come

##### See in action

```bash
git clone https://github.com/k1r0s/angular2-aop-showcase.git
cd angular2-aop-showcase
npm install
ng serve
```

By default subsequent calls are cached by `cache-holder.ts`, look over application tab in developer tools to remove cache.

##### Detailed Explanation

... todo
