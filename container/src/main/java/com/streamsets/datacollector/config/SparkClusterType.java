/*
 * Copyright 2019 StreamSets Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.streamsets.datacollector.config;

import com.streamsets.pipeline.api.GenerateResourceBundle;
import com.streamsets.pipeline.api.Label;

/**
 * Enum for representing possible Cluster Type
 */
@GenerateResourceBundle
public enum SparkClusterType implements Label {
  LOCAL("None (local)"),
  YARN("Hadoop YARN"),
  DATABRICKS("Databricks"),
  STANDALONE_SPARK_CLUSTER("Standalone Spark Cluster"),
  SQL_SERVER_BIG_DATA_CLUSTER("SQL Server Big Data Cluster"),
  ;

  private final String label;

  SparkClusterType(String label) {
    this.label = label;
  }

  @Override
  public String getLabel() {
    return label;
  }
}
