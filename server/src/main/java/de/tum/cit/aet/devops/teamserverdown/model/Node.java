package de.tum.cit.aet.devops.teamserverdown.model;

import jakarta.persistence.*;

@Entity
@Table(name = "nodes")
public class Node {

  @Id private String id;

  @Column(name = "whiteboard_id", nullable = false)
  private long whiteboardId;

  @Column(nullable = false)
  private String type;

  @Column(name = "position_x", nullable = false)
  private double positionX;

  @Column(name = "position_y", nullable = false)
  private double positionY;

  @Column(columnDefinition = "TEXT")
  private String label;

  @Column(name = "width", nullable = false)
  private double width;

  @Column(name = "height", nullable = false)
  private double height;

  // properties

  @Column(name = "color")
  private String color;

  @Column(name = "border_color")
  private String borderColor;

  @Column(name = "border_width")
  private int borderWidth;

  @Column(name = "border_opacity")
  private double borderOpacity;

  @Column(name = "opacity")
  private double opacity;

  @Column(name = "text_color")
  private String textColor;

  @Column(name = "font_size")
  private int fontSize;

  @Column(name = "font_family")
  private String fontFamily;

  @Column(name = "is_bold")
  private boolean isBold;

  @Column(name = "is_italic")
  private boolean isItalic;

  @Column(name = "is_strikethrough")
  private boolean isStrikethrough;

  @Column(name = "is_underline")
  private boolean isUnderline;

  public Node() {}

  public Node(
      String id,
      long whiteboardId,
      String type,
      double positionX,
      double positionY,
      String label,
      double width,
      double height,
      String color,
      String borderColor,
      int borderWidth,
      double borderOpacity,
      double opacity,
      String textColor,
      int fontSize,
      String fontFamily,
      boolean isBold,
      boolean isItalic,
      boolean isStrikethrough,
      boolean isUnderline) {
    this.id = id;
    this.whiteboardId = whiteboardId;
    this.type = type;
    this.positionX = positionX;
    this.positionY = positionY;
    this.label = label;
    this.width = width;
    this.height = height;
    this.color = color;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
    this.borderOpacity = borderOpacity;
    this.opacity = opacity;
    this.textColor = textColor;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.isBold = isBold;
    this.isItalic = isItalic;
    this.isStrikethrough = isStrikethrough;
    this.isUnderline = isUnderline;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public long getWhiteboardId() {
    return whiteboardId;
  }

  public void setWhiteboardId(long whiteboardId) {
    this.whiteboardId = whiteboardId;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public double getPositionX() {
    return positionX;
  }

  public void setPositionX(double positionX) {
    this.positionX = positionX;
  }

  public double getPositionY() {
    return positionY;
  }

  public void setPositionY(double positionY) {
    this.positionY = positionY;
  }

  public String getLabel() {
    return label;
  }

  public void setLabel(String label) {
    this.label = label;
  }

  // properties

  public double getWidth() {
    return width;
  }

  public void setWidth(double width) {
    this.width = width;
  }

  public double getHeight() {
    return height;
  }

  public void setHeight(double height) {
    this.height = height;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public String getBorderColor() {
    return borderColor;
  }

  public void setBorderColor(String borderColor) {
    this.borderColor = borderColor;
  }

  public int getBorderWidth() {
    return borderWidth;
  }

  public void setBorderWidth(int borderWidth) {
    this.borderWidth = borderWidth;
  }

  public double getBorderOpacity() {
    return borderOpacity;
  }

  public void setBorderOpacity(double borderOpacity) {
    this.borderOpacity = borderOpacity;
  }

  public double getOpacity() {
    return opacity;
  }

  public void setOpacity(double opacity) {
    this.opacity = opacity;
  }

  public String getTextColor() {
    return textColor;
  }

  public void setTextColor(String textColor) {
    this.textColor = textColor;
  }

  public int getFontSize() {
    return fontSize;
  }

  public void setFontSize(int fontSize) {
    this.fontSize = fontSize;
  }

  public String getFontFamily() {
    return fontFamily;
  }

  public void setFontFamily(String fontFamily) {
    this.fontFamily = fontFamily;
  }

  public boolean isBold() {
    return isBold;
  }

  public void setBold(boolean bold) {
    isBold = bold;
  }

  public boolean isItalic() {
    return isItalic;
  }

  public void setItalic(boolean italic) {
    isItalic = italic;
  }

  public boolean isStrikethrough() {
    return isStrikethrough;
  }

  public void setStrikethrough(boolean strikethrough) {
    isStrikethrough = strikethrough;
  }

  public boolean isUnderline() {
    return isUnderline;
  }

  public void setUnderline(boolean underline) {
    isUnderline = underline;
  }
}
