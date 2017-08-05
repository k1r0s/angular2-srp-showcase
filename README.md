### Aspect oriented programming example in Angular 2 - 4 -->

This is an example about separation of concerns in Angular applications. This example is quite simple and maybe cannot be a solution for complex problems. Learn more about https://en.wikipedia.org/wiki/Aspect-oriented_programming

This example is about removing infrastructure code from components by applying abstraction and modularity using AOP technique.

The following example is about a component that must contain a list of peoples, simple as that. There are hundreds of approaches but many of them do not apply separation of concerns and code readability.. and probably, if you have to repeat that process in different scenarios you will run duplication and code scattering problems.

##### There we go:

- create a component (AppComponent)
- describe a Pattern (Interface + Advice) of (component that must trigger an ajax request and receive a response)
- create an Interface called (ResourceContainer)
- create behavior (Advice) called (ResourceContainerBehavior)
- create a service that fits that behavior (service must fit Behavior rather than **component needs**)
- our component should implement ResourceContainer
- then our ResourceContainerBehavior should be declared as a trigger of the needed action

##### Explanation

... todo
