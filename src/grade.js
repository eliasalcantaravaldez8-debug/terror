// Correção de cor ("color grading") feita dentro do tone mapping de cada material:
// sem passe extra de pós-processamento, então não custa FPS.
// ACES + saturação um pouco maior + curva S suave + sombras levemente frias e luzes quentes.
import * as THREE from 'three';

const GRADE = `vec3 CustomToneMapping( vec3 color ) {
	vec3 c = ACESFilmicToneMapping( color );
	float l = dot( c, vec3( 0.2126, 0.7152, 0.0722 ) );
	c = max( mix( vec3( l ), c, 1.14 ), 0.0 );
	vec3 p = sqrt( c );
	p = mix( p, p * p * ( 3.0 - 2.0 * p ), 0.2 );
	c = p * p;
	float lw = smoothstep( 0.02, 0.45, l );
	c *= mix( vec3( 0.95, 0.985, 1.06 ), vec3( 1.035, 1.0, 0.955 ), lw );
	return clamp( c, 0.0, 1.0 );
}`;

const chunk = THREE.ShaderChunk.tonemapping_pars_fragment;
if (chunk.includes('vec3 CustomToneMapping( vec3 color ) { return color; }')) {
  THREE.ShaderChunk.tonemapping_pars_fragment = chunk.replace('vec3 CustomToneMapping( vec3 color ) { return color; }', GRADE);
}
export const GRADED_TONEMAPPING = THREE.CustomToneMapping;
