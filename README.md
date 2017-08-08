### Aspect oriented programming example in Angular 2 - 4 -->

This is an example about separation of concerns in Angular applications. This example is quite simple and maybe cannot be a solution for complex problems. Learn more about https://en.wikipedia.org/wiki/Aspect-oriented_programming

This example is about removing infrastructure code from components by applying abstraction and modularity using AOP technique.

The following example is about a component that must contain a list of peoples, simple as that. There are hundreds of approaches but many of them do not apply separation of concerns and code readability.. and probably, if you have to repeat that process in different scenarios you will run duplication and code scattering problems.

##### There we go:

## async calls

- create a component (AppComponent)
- describe a Pattern (Interface + Advice) of (component that must trigger an ajax request and receive a response)
- create an Interface called (ResourceContainer)
```typescript
export interface ResourceContainer {
  service: CommonRequest
  resourceLoad(data?: any[]): void
}
```
- create behavior (Advice) called (ResourceContainerBehavior)
```typescript
export const ResourceContainerBehavior = beforeMethod<ResourceContainer, "resourceLoad">(function(meta) {
  meta.scope.service.getResource().toPromise().then((data) => {
    meta.args.push(data)
    this.next()
  })
})
```
- create a service that fits that behavior (service must fit Behavior rather than **component needs**)
- our component should implement ResourceContainer
- then our ResourceContainerBehavior should be declared only at `resourceLoad` method which is defined as the only trigger for that action (customizable).

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
export const OpenDialogBehavior = (dialogComponent) => {
  return afterMethod<DialogHolder>(function(meta) {
    meta.scope.dialogRef = meta.scope.dialogFactory.open(dialogComponent, { data: meta.result })
    if (typeof meta.scope.onDialogClose === "function") {
      meta.scope.dialogRef.afterClosed()
      .subscribe(meta.scope.onDialogClose.bind(meta.scope))
    }
  })
}
```
- our component should implement DialogHolder
- in this case any method can trigger OpenDialogBehavior so we need to decorate that method, that's all. Note that in the advice we check if `onDialogClose` is defined on annotated instance we subscribe that function.
 

##### See in action

```bash
git clone https://github.com/k1r0s/angular2-aop-showcase.git
cd angular2-aop-showcase
npm install
ng serve
```

##### Detailed Explanation

... todo
