import React from 'react';
import {H, shadow} from '../config';
import {PAGE_W, SiteVague, SiteClear, SiteConfusing} from './Sites';

export type SiteKey = 'vague' | 'clear' | 'confusing';

export const SitePage: React.FC<{site: SiteKey; headlineNode?: React.ReactNode; aboveHeadline?: React.ReactNode}> = ({site, headlineNode, aboveHeadline}) => {
  if (site === 'clear') return <SiteClear />;
  if (site === 'confusing') return <SiteConfusing />;
  return <SiteVague headlineNode={headlineNode} aboveHeadline={aboveHeadline} />;
};

/**
 * Full-bleed website showcase: the page fills the canvas width and runs to the
 * bottom edge like a sheet; `scroll` moves the page up, `zoom` scales it around
 * `originY` (page px) so the camera can glide over the hero.
 */
export const Showcase: React.FC<{
  site: SiteKey;
  top?: number;
  scroll?: number;
  zoom?: number;
  originY?: number;
  radius?: number;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  headlineNode?: React.ReactNode;
  aboveHeadline?: React.ReactNode;
  children?: React.ReactNode;
}> = ({site, top = 0, scroll = 0, zoom = 1, originY = 0, radius = 44, style, innerStyle, headlineNode, aboveHeadline, children}) => (
  <div
    style={{
      position: 'absolute',
      top,
      left: 0,
      width: PAGE_W,
      height: H - top,
      overflow: 'hidden',
      borderRadius: `${radius}px ${radius}px 0 0`,
      background: '#fff',
      boxShadow: shadow.float,
      ...style,
    }}
  >
    <div style={{transform: `translateY(${-scroll}px) scale(${zoom})`, transformOrigin: `50% ${originY}px`, ...innerStyle}}>
      <SitePage site={site} headlineNode={headlineNode} aboveHeadline={aboveHeadline} />
    </div>
    {children}
  </div>
);

/** Cropped, scaled screenshot of the top of a page (used on the result cards) */
export const SiteThumb: React.FC<{site: SiteKey; scale: number; h: number; radius?: number}> = ({site, scale, h, radius = 20}) => (
  <div style={{width: PAGE_W * scale, height: h, overflow: 'hidden', borderRadius: radius, background: '#fff', boxShadow: shadow.soft, position: 'relative'}}>
    <div style={{width: PAGE_W, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0}}>
      <SitePage site={site} />
    </div>
  </div>
);
