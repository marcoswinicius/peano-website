import React, { CSSProperties } from "react";
import CardSvg from "./ui/credit-card";

type CreditCardProps = {
  isStatic?: boolean;
  borderRadius?: string;
  shineStrength?: number;
  cursorPointer?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  children?: React.ReactNode;
};

type CreditCardState = {
  rootElemWidth: number;
  rootElemHeight: number;
  isOnHover: boolean;
  container: CSSProperties;
  shine: CSSProperties;
  layers: React.ReactElement[];
  layersTransform: CSSProperties[];
};

export class CreditCard extends React.Component<CreditCardProps, CreditCardState> {
  static defaultProps: Partial<CreditCardProps> = {
    isStatic: false,
    borderRadius: "20px",
    shineStrength: 0.4,
    cursorPointer: true,
  };

  private node: HTMLDivElement | null = null;

  constructor(props: CreditCardProps) {
    super(props);
    const childrenArray = props.children
      ? Array.isArray(props.children)
        ? (props.children as React.ReactElement[])
        : [props.children as React.ReactElement]
      : [React.createElement(CardSvg, { 
          style: { 
            width: '100%', 
            height: '100%',
            display: 'block'
          } 
        })];

    this.state = {
      rootElemWidth: 0,
      rootElemHeight: 0,
      isOnHover: false,
      container: {},
      shine: {},
      layers: childrenArray,
      layersTransform: [],
    };
  }

  componentDidMount(): void {
    if (!this.props.isStatic && this.node) {
      const width = this.node.clientWidth || this.node.offsetWidth || this.node.scrollWidth || 0;
      const height = this.node.clientHeight || this.node.offsetHeight || this.node.scrollHeight || 0;
      this.setState({
        rootElemWidth: width,
        rootElemHeight: height,
      });
    }
  }

  handleMove = ({ pageX, pageY }: { pageX: number; pageY: number }) => {
    const layerCount = this.state.layers ? this.state.layers.length : 1;
    const { rootElemWidth, rootElemHeight } = this.state;
    const bodyScrollTop =
      document.body.scrollTop || document.getElementsByTagName("html")[0].scrollTop || 0;
    const bodyScrollLeft = document.body.scrollLeft || 0;
    if (!this.node) return;
    const offsets = this.node.getBoundingClientRect();
    const wMultiple = 320 / (rootElemWidth || 1);
    const multiple = wMultiple * 0.07;
    const offsetX = 0.52 - (pageX - offsets.left - bodyScrollLeft) / (rootElemWidth || 1);
    const offsetY = 0.52 - (pageY - offsets.top - bodyScrollTop) / (rootElemHeight || 1);
    const dy = pageY - offsets.top - bodyScrollTop - (rootElemHeight || 0) / 2;
    const dx = pageX - offsets.left - bodyScrollLeft - (rootElemWidth || 0) / 2;
    const yRotate = (offsetX - dx) * multiple;
    const xRotate = (dy - offsetY) * (Math.min(offsets.width / offsets.height, 1) * multiple);
    const arad = Math.atan2(dy, dx);
    const rawAngle = (arad * 180) / Math.PI - 90;
    const angle = rawAngle < 0 ? rawAngle + 360 : rawAngle;

    this.setState({
      container: {
        transform: `rotateX(${xRotate}deg) rotateY(${yRotate}deg) ${
          this.state.isOnHover ? " scale3d(1.07,1.07,1.07)" : ""
        }`,
      },
      shine: {
        background: `linear-gradient(${angle}deg, rgba(255, 255, 255, ${
          ((pageY - offsets.top - bodyScrollTop) / (rootElemHeight || 1)) * (this.props.shineStrength || 0)
        }) 0%, rgba(255, 255, 255, 0) 80%)`,
        transform: `translateX(${offsetX * layerCount - 0.1}px) translateY(${offsetY * layerCount - 0.1}px)`,
      },
      layersTransform: this.state.layers
        ? this.state.layers.map((_, idx) => ({
            transform: `translateX(${offsetX * layerCount * (idx / wMultiple)}px) translateY(${offsetY * layerCount * (idx / wMultiple)}px)`,
          }))
        : [],
    });
  };

  handleTouchMove = (evt: React.TouchEvent<HTMLDivElement>) => {
    evt.preventDefault();
    const { pageX, pageY } = evt.touches[0];
    this.handleMove({ pageX, pageY });
  };

  handleEnter = () => {
    this.setState({ isOnHover: true });
  };

  handleLeave = () => {
    this.setState({
      isOnHover: false,
      container: {},
      shine: {},
      layersTransform: [],
    });
  };

  renderLayers = () => {
    const { borderRadius, style } = this.props;
    return (
      <div
        className="parallax-card-layers"
        style={{
          position: "relative",
          borderRadius: borderRadius,
          overflow: "hidden",
          transformStyle: "preserve-3d",
          backgroundColor: "transparent",
          zIndex: 2,
          width: '260px',
          height: '408px',
          ...style,
        }}
      >
        {this.state.layersTransform &&
          React.Children.map(this.state.layers, (child, idx) => {
            const mergedStyle = {
              ...(child.props as any).style,
              transition: "all 0.1s ease-out",
              zIndex: 4,
              ...(this.state.layersTransform[idx] ? this.state.layersTransform[idx] : {}),
            };
            return React.cloneElement(child, { style: mergedStyle } as any);
          })}
      </div>
    );
  };

  render(): React.ReactNode {
    const { borderRadius, cursorPointer, onClick } = this.props;
    const { rootElemWidth, isOnHover } = this.state;
    return (
      <div style={{ display: "flex", minWidth: '280px', minHeight: '440px' }}>
        <div
          onClick={onClick}
          style={{
            borderRadius: borderRadius,
            transformStyle: "preserve-3d",
            WebkitTapHighlightColor: "rgba(#000, 0)",
            cursor: cursorPointer ? "pointer" : undefined,
            transform: `perspective(${rootElemWidth * 3 || 1200}px)`,
            zIndex: isOnHover ? 9 : undefined,
            minWidth: '262px',
            minHeight: '440px',
          }}
          onMouseMove={(e) => this.handleMove({ pageX: e.pageX, pageY: e.pageY })}
          onMouseEnter={this.handleEnter}
          onMouseLeave={this.handleLeave}
          onTouchMove={this.handleTouchMove}
          onTouchStart={this.handleEnter}
          onTouchEnd={this.handleLeave}
          className="parallax-card"
          ref={(node) => {
            this.node = node;
          }}
        >
          <div
            className="parallax-card-container"
            style={{
              position: "relative",
              borderRadius: borderRadius,
              transition: "all 0.2s ease-out",
              ...this.state.container,
            }}
          >
            <div
              className="parallax-card-shadow"
              style={{
                position: "absolute",
                top: "5%",
                left: "5%",
                right: "5%",
                bottom: "5%",
                transition: "all 0.2s ease-out",
                zIndex: 0,
                boxShadow: isOnHover
                  ? "0 45px 100px rgba(14, 21, 47, 0.4), 0 16px 40px rgba(14, 21, 47, 0.4)"
                  : "0 8px 30px rgba(14, 21, 47, 0.6)",
              }}
            />
            <div
              className="parallax-card-shine"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: borderRadius,
                background: `linear-gradient(135deg,rgba(255, 255, 255, ${(this.props.shineStrength || 0.4) / 1.6}) 0%,rgba(255, 255, 255, 0) 60%)`,
                zIndex: 8,
                opacity: 0.6,
                pointerEvents: 'none',
                ...this.state.shine,
              }}
            />
            {this.renderLayers()}
          </div>
        </div>
      </div>
    );
  }
}
