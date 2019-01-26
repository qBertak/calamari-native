// @ts-ignore
import {View} from 'react-native';

// @ts-ignore
import createBlock, {createNode, createClassName} from 'calamari';
import {
    StylesApplyerFunc,
    ClassNameData,
    Elements,
    NodeSchema,
} from 'calamari/types';

type ResultStyle = [any] | [];
type StyleSrc = any;

export default function createCalamari(block: NodeSchema, elements: Elements, styleSrc: StyleSrc) {
    return createBlock(block, elements, getNativeNodeCreater(styleSrc));
}

function getNativeNodeCreater (styleSrc: StyleSrc) {
    return (params: NodeSchema) => createNativeNode(params, createStyleApplyer(styleSrc));
}

function createNativeNode ({component, ...rest}: NodeSchema, styleApplyer: StylesApplyerFunc) {
    return createNode({...rest, component: component || View}, styleApplyer);
}

function createStyleApplyer (styleSrc: StyleSrc): StylesApplyerFunc {
    const styleApplyer = (classNameData: ClassNameData) => ({
        style: createClassName(classNameData)
        .split(' ')
        .reduce((resultStyle: ResultStyle, classNamePart: string) =>
            resultStyle.concat(styleSrc[classNamePart]),
            getInitialStyle(classNameData.style)
        ),
    });

    return styleApplyer;
};

function getInitialStyle(style: any): ResultStyle {
    switch (true) {
    case Array.isArray(style):
        return style;
    case typeof style === 'number':
    case typeof style === 'object':
        return [style];
    case typeof style === 'undefined':
        return [];
    default:
        throw new Error('Wrong style type ' + typeof style);
    }
}
