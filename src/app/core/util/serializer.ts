import { JsonConvert, OperationMode, ValueCheckingMode } from 'json2typescript';

export class Serializer {
  public static deserialize<T>(
    element: any | any[],
    classReference: {
      new (): T;
    }
  ): T | null {
    const jsonConvert: JsonConvert = new JsonConvert();
    jsonConvert.operationMode = OperationMode.ENABLE;
    jsonConvert.ignorePrimitiveChecks = false;
    jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;

    try {
      return jsonConvert.deserialize<T>(element, classReference) as T;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public static serialize<T>(element: T | T[]): any | any[] | null {
    const jsonConvert: JsonConvert = new JsonConvert();
    jsonConvert.operationMode = OperationMode.ENABLE;
    jsonConvert.ignorePrimitiveChecks = false;
    jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;

    try {
      if (Array.isArray(element)) {
        return jsonConvert.serializeArray(element);
      } else {
        return jsonConvert.serialize(element);
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
