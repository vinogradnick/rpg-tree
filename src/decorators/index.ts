export function log(target: any, key: any, descriptor: PropertyDescriptor) {
  var originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    let functionName = key;
    console.log(functionName + '(' + args.join(', ') + ')');
    let result = originalMethod.apply(this, args);
    console.log('=> ' + result);
    return result;
  };

  return descriptor;
}
